import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function CodeEntryModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const inputRefs = useRef([])

  useEffect(() => {
    setIsOpen(true)
    // Generate a random 6-character code
    setGeneratedCode(Math.random().toString(36).substring(2, 8).toUpperCase())
  }, [])

  const handleInputChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code]
      newCode[index] = value.toUpperCase()
      setCode(newCode)

      // Move focus to next input
      if (value !== '' && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && code[index] === '') {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = () => {
    const enteredCode = code.join('')
    if (enteredCode === generatedCode) {
      setIsOpen(false)
      // Aquí puedes agregar la lógica para continuar después de ingresar el código correcto
    } else {
      setError('Código incorrecto. Por favor, inténtalo de nuevo.')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ingrese el código para continuar</DialogTitle>
          <DialogDescription>
            Por favor, ingrese el código de acceso mostrado abajo.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="text-2xl font-bold tracking-wider bg-gray-100 p-3 rounded">
            {generatedCode}
          </div>
          <div className="flex gap-2">
            {code.map((digit, index) => (
              <Input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => inputRefs.current[index] = el}
                className="w-10 h-10 text-center text-lg"
              />
            ))}
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <button className={`w-full`} onClick={handleSubmit} >Continuar</button>
      </DialogContent>
    </Dialog>
  )
}