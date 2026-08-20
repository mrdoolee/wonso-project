import './Stepper.css'

interface StepperProps {
  label: string
  value: number
  min: number
  max: number
  onChange: (next: number) => void
  unit?: string
  size?: 'md' | 'sm'
}

export default function Stepper({ label, value, min, max, onChange, unit, size = 'md' }: StepperProps) {
  return (
    <div className={`stepper stepper--${size}`}>
      <span className="stepper__label">{label}</span>
      <div className="stepper__control">
        <button
          type="button"
          className="stepper__btn"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`${label} 줄이기`}
        >
          −
        </button>
        <span className="stepper__value">
          {value}
          {unit}
        </span>
        <button
          type="button"
          className="stepper__btn"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`${label} 늘리기`}
        >
          ＋
        </button>
      </div>
    </div>
  )
}
