import { EyeIcon, EyeOffIcon } from 'lucide-react'
import * as React from 'react'

import { Input } from '@/components/ui/input.tsx'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  useIcon: boolean
}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ useIcon = false, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(true)

    return (
      <Input
        type={showPassword ? 'password' : 'text'}
        className={className}
        {...props}
        ref={ref}
        suffix={
          useIcon &&
          (showPassword ? (
            <EyeOffIcon onClick={() => setShowPassword(false)} />
          ) : (
            <EyeIcon onClick={() => setShowPassword(true)} />
          ))
        }
      />
    )
  },
)

PasswordInput.displayName = 'Input'

export { PasswordInput }
