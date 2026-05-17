import { memo } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

type Step = {
  label: string;
};

type Props = {
  steps: Step[];
  currentStep: number;
  className?: string;
};

const Stepper = ({ steps, currentStep, className }: Props) => {
  const { t } = useTranslation();

  return (
    <div
      className={cn("flex items-center w-full", className)}
      role="navigation"
      aria-label="Progress steps"
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div
            key={index}
            className="flex items-center flex-1"
          >
            <div className="flex flex-col items-center gap-1 flex-1">
              <div
                className={cn(
                  "flex items-center justify-center size-8 rounded-full text-sm font-medium border-2 transition-colors",
                  isCompleted && "bg-primary border-primary text-primary-foreground",
                  isActive && "border-primary text-primary",
                  !isCompleted && !isActive && "border-muted-foreground/30 text-muted-foreground/50"
                )}
                aria-current={isActive ? "step" : undefined}
              >
                {isCompleted ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium text-center transition-colors",
                  isActive && "text-foreground",
                  !isActive && "text-muted-foreground"
                )}
              >
                {t(step.label)}
              </span>
            </div>

            {!isLast && (
              <div
                className={cn(
                  "h-0.5 w-full -translate-x-1/2 transition-colors",
                  isCompleted ? "bg-primary" : "bg-muted-foreground/20"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export { Stepper };
export type { Step };
export default memo(Stepper);
