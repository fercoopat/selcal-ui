import { File, Trash } from "lucide-react";
import { memo, useCallback, useRef, useState } from "react";
import {
  Controller,
  useFormContext,
  type ControllerFieldState,
  type ControllerRenderProps,
  type FieldValues,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormFieldLabel } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { formatFileSize } from "@/modules/comments/helpers/files.helpers";

const ACCEPT_FILES = {
  "image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp"],
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
  "text/plain": [".txt"],
  "application/vnd.ms-excel": [".xls"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
    ".xlsx",
  ],
};

interface Props {
  name: string;
  label?: string;
  description?: string;
  maxFiles?: number;
  maxSizePerFile?: number;
  accept?: Record<string, string[]>;
  disabled?: boolean;
  required?: boolean;
}

const FormFilesField = ({
  name,
  label = "comments:fields.files",
  description = "comments:fields.filesDescription",
  maxFiles = 10,
  maxSizePerFile = 10 * 1024 * 1024,
  accept = ACCEPT_FILES,
  disabled = false,
  required = false,
}: Props) => {
  const { t } = useTranslation();
  const form = useFormContext();

  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const renderField = useCallback(
    ({
      field,
      fieldState,
    }: {
      field: ControllerRenderProps<FieldValues>;
      fieldState: ControllerFieldState;
    }) => {
      const files: File[] = field.value || [];

      const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
      };

      const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
      };

      const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        addFiles(droppedFiles);
      };

      const addFiles = (newFiles: File[]) => {
        const uniqueFiles = newFiles.filter(
          (newFile) =>
            !files.some(
              (existing) =>
                existing.name === newFile.name &&
                existing.size === newFile.size,
            ),
        );

        if (files.length + uniqueFiles.length > maxFiles) {
          const availableSlots = maxFiles - files.length;
          if (availableSlots > 0) {
            const filesToAdd = uniqueFiles.slice(0, availableSlots);
            field.onChange([...files, ...filesToAdd]);
          }
        } else {
          field.onChange([...files, ...uniqueFiles]);
        }
      };

      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        addFiles(selectedFiles);

        if (inputRef.current) {
          inputRef.current.value = "";
        }
      };

      const removeFile = (index: number) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        field.onChange(newFiles);
      };

      const clearFiles = () => {
        field.onChange([]);
      };

      const filesList = files.map((file, index) => (
        <li key={`${file.name}-${index}`} className="relative">
          <Card className="relative p-4">
            <div className="absolute top-1/2 right-4 -translate-y-1/2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeFile(index)}
                disabled={disabled}
              >
                <Trash className="h-5 w-5" />
              </Button>
            </div>
            <CardContent className="flex items-center space-x-3 p-0">
              <span className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-md">
                <File className="text-foreground h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p
                  className="text-foreground truncate font-medium"
                  title={file.name}
                >
                  {file.name}
                </p>
                <p className="text-muted-foreground mt-0.5 text-sm">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </CardContent>
          </Card>
        </li>
      ));

      return (
        <Field data-invalid={fieldState.invalid}>
          <FormFieldLabel
            htmlFor={`form-${field.name}-field-files`}
            required={required}
          >
            {t(label)}
          </FormFieldLabel>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !disabled && inputRef.current?.click()}
            className={cn(
              "mt-2 flex justify-center rounded-md border border-dashed px-6 py-12 transition-colors duration-200",
              {
                "border-primary bg-primary/10 ring-primary/20 ring-2":
                  isDragActive,
                "border-border hover:border-primary/50": !isDragActive,
                "cursor-not-allowed opacity-60": disabled,
                "cursor-pointer": !disabled,
              },
            )}
          >
            <div className="text-center">
              <File className="text-muted-foreground/80 mx-auto h-12 w-12" />

              <div className="text-muted-foreground mt-4">
                <span className="text-primary hover:text-primary/80">
                  {isDragActive
                    ? t("common:dropFiles.dropHelper")
                    : t(description)}
                </span>
              </div>

              <p className="text-muted-foreground mt-2 text-sm">
                {t("common:max")} {maxFiles} {t("common:files")},{" "}
                {formatFileSize(maxSizePerFile)} {t("common:eachOne")}
              </p>
              <input
                ref={inputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                accept={Object.entries(accept)
                  .map(([_mime, exts]) => exts.join(","))
                  .join(",")}
                id={`form-${field.name}-field-files`}
                className="sr-only"
                disabled={disabled}
              />
            </div>
          </div>

          {!!files?.length && (
            <>
              <div className="mt-4 flex items-center justify-between">
                <h4 className="text-foreground font-medium">
                  {t("common:dropFiles.selectedFiles")} ({files.length})
                </h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearFiles}
                  disabled={disabled}
                >
                  {t("common:dropFiles.cleanAll")}
                </Button>
              </div>

              <ul role="list" className="mt-4 space-y-3">
                {filesList}
              </ul>
            </>
          )}

          {!!fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      );
    },
    [
      required,
      t,
      label,
      isDragActive,
      disabled,
      description,
      maxFiles,
      maxSizePerFile,
      accept,
    ],
  );

  return <Controller name={name} control={form.control} render={renderField} />;
};

export default memo(FormFilesField);
