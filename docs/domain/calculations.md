# Domain Calculations Reference

## Overview

SELCAL-Web calculates steel rolling calibrations for simple profiles: **round**, **square**, and **hexagonal**. The calculation engine transforms an initial billet through a series of passes until reaching the target profile dimensions.

> **Precision First**: Mathematical accuracy is non-negotiable. All formulas must be validated against the 2012 legacy system baseline.

## Core Calculations

The calculation library is located at `@/lib/math/calculations.ts`. All metallurgical functions should be pure functions with explicit type annotations.

### 1. Profile Area

The cross-sectional area of the profile at each pass.

#### Round Profile
```
A = π × (d/2)²
```
Where:
- `A` = Cross-sectional area (mm²)
- `d` = Diameter (mm)

#### Square Profile
```
A = s²
```
Where:
- `s` = Side length (mm)

#### Hexagonal Profile
```
A = (3√3/2) × s²
```
Where:
- `s` = Side length (mm)

### 2. Elongation Coefficient

The ratio of initial to final area at each pass:

```
λ = A_initial / A_final
```

Where:
- `λ` = Elongation coefficient (dimensionless, always > 1)
- `A_initial` = Area before pass (mm²)
- `A_final` = Area after pass (mm²)

**Constraint**: Maximum elongation per pass is material-dependent. Typical limits:
- Low carbon steel: λ_max ≈ 1.35
- Medium carbon steel: λ_max ≈ 1.30
- High carbon steel: λ_max ≈ 1.25

### 3. Area Reduction

```
ΔA = A_initial - A_final
Reduction % = (ΔA / A_initial) × 100
```

### 4. Mean Height and Width

For non-circular profiles, the mean dimensions at each pass:

```
h_mean = (h_max + h_min) / 2
w_mean = (w_max + w_min) / 2
```

These values are used for roll gap settings and spread calculations.

### 5. Temperature-Dependent Yield Strength

The yield strength of steel varies with temperature. Use the material grade-specific curve:

```
σ_y = f(T, grade)
```

Where:
- `σ_y` = Yield strength (MPa)
- `T` = Temperature (°C)
- `grade` = Steel grade identifier

Reference values (approximate for common grades):

| Grade | 1200°C | 1000°C | 800°C | 600°C |
|---|---|---|---|---|
| SAE 1018 | 80 MPa | 120 MPa | 200 MPa | 350 MPa |
| SAE 1045 | 90 MPa | 140 MPa | 250 MPa | 420 MPa |
| SAE 4140 | 100 MPa | 160 MPa | 280 MPa | 480 MPa |

> **Note**: Use the material-specific lookup table from the backend for precise values.

### 6. Rolling Force

The force required for each pass:

```
F = σ_fm × A_c × Q
```

Where:
- `F` = Rolling force (N)
- `σ_fm` = Mean flow stress (MPa) — typically 1.15 × σ_y for hot rolling
- `A_c` = Contact area between roll and workpiece (mm²)
- `Q` = Geometric factor (accounts for friction and geometry, typically 1.0–1.2)

Contact area approximation:
```
A_c = w_mean × √(R × Δh)
```
Where:
- `w_mean` = Mean width of workpiece (mm)
- `R` = Roll radius (mm)
- `Δh` = Height reduction per pass (mm)

### 7. Torque

```
T = F × a
```

Where:
- `T` = Torque per roll (N·m)
- `F` = Rolling force (N)
- `a` = Moment arm ≈ 0.5 × √(R × Δh) for hot rolling

Total torque (two-high mill):
```
T_total = 2 × T
```

### 8. Power Requirements

```
P = (T_total × ω) / η
```

Where:
- `P` = Power (W)
- `T_total` = Total torque (N·m)
- `ω` = Angular velocity (rad/s) = 2π × RPM / 60
- `η` = Mechanical efficiency (typically 0.85–0.95)

Convert to horsepower:
```
HP = P / 745.7
```

## Pass Sequence Design

The calibration wizard determines the number and type of passes needed to transform the initial billet into the target profile.

### Pass Types
1. **Breakdown passes**: Large reductions, initial shaping
2. **Intermediate passes**: Moderate reductions, profile refinement
3. **Finishing passes**: Small reductions, final dimensions and surface quality

### Design Constraints
- Maximum elongation per pass (material-dependent)
- Maximum rolling force (mill capacity)
- Maximum power (motor capacity)
- Temperature loss between passes (radiation, conduction)
- Spread factor (lateral material flow)

## Data Structures

### Calibration Input

```typescript
interface CalibrationInput {
  // Initial billet
  initialHeight: number;    // mm
  initialWidth: number;     // mm
  initialTemperature: number; // °C
  materialGrade: string;

  // Target profile
  profileType: "round" | "square" | "hexagonal";
  targetDimension: number;  // diameter or side length (mm)

  // Mill parameters
  rollDiameter: number;     // mm
  rollSpeed: number;        // RPM
  millCapacity: number;     // kN (max rolling force)
  motorPower: number;       // kW
}
```

### Pass Output

```typescript
interface CalibrationPass extends CommonFields {
  passNumber: number;
  passType: "breakdown" | "intermediate" | "finishing";

  // Dimensions
  inputHeight: number;
  inputWidth: number;
  outputHeight: number;
  outputWidth: number;

  // Calculated values
  area: number;             // mm²
  elongation: number;       // λ
  reduction: number;        // %

  // Force & power
  rollingForce: number;     // kN
  torque: number;           // N·m
  power: number;            // kW

  // Temperature
  temperature: number;      // °C (after pass)
}
```

## Implementation Guidelines

### 1. Pure Functions Only
All calculation functions must be pure — no side effects, no external state:

```typescript
// Good
export function calculateArea(profileType: ProfileType, dimension: number): number {
  switch (profileType) {
    case "round":
      return Math.PI * Math.pow(dimension / 2, 2);
    case "square":
      return Math.pow(dimension, 2);
    case "hexagonal":
      return (3 * Math.sqrt(3) / 2) * Math.pow(dimension, 2);
  }
}

// Bad: depends on external state
export function calculateArea(dimension: number): number {
  return Math.PI * Math.pow(dimension / 2, 2); // Assumes round, unclear
}
```

### 2. Explicit Units
Always document units in function signatures and return types:

```typescript
/**
 * Calculates rolling force in kilonewtons (kN).
 * @param meanFlowStress - Mean flow stress in MPa
 * @param contactWidth - Contact width in mm
 * @param rollRadius - Roll radius in mm
 * @param heightReduction - Height reduction in mm
 * @returns Rolling force in kN
 */
export function calculateRollingForce(
  meanFlowStress: number,
  contactWidth: number,
  rollRadius: number,
  heightReduction: number,
): number {
  // ...
}
```

### 3. Validation
Validate inputs before calculations:

```typescript
export function calculateElongation(initialArea: number, finalArea: number): number {
  if (initialArea <= 0 || finalArea <= 0) {
    throw new Error("Areas must be positive values");
  }
  if (finalArea >= initialArea) {
    throw new Error("Final area must be less than initial area for rolling");
  }
  return initialArea / finalArea;
}
```

### 4. Precision
Use appropriate precision for metallurgical calculations:
- Dimensions: 2 decimal places (mm)
- Forces: 1 decimal place (kN)
- Power: 1 decimal place (kW)
- Elongation: 3 decimal places (dimensionless)
- Temperature: nearest whole degree (°C)

### 5. Testing
All calculation functions must have unit tests covering:
- Normal operating range
- Boundary conditions
- Error cases (invalid inputs)
- Known reference values from the 2012 legacy system

## Reference: Steel Grades

Common steel grades used in rolling:

| Grade | C % | Mn % | Application |
|---|---|---|---|
| SAE 1008 | 0.08 | 0.30 | Wire rod, light sections |
| SAE 1018 | 0.18 | 0.60 | General purpose |
| SAE 1020 | 0.20 | 0.50 | Structural sections |
| SAE 1045 | 0.45 | 0.60 | Shafts, axles |
| SAE 4140 | 0.40 | 0.85 | High-strength applications |

Material constants are defined in `@/modules/materials/constants/`.
