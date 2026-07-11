import React from 'react'
import { useHeader } from '../contexts/HeaderContext'
export default function Category() {
  const { configureHeader } = useHeader()

  React.useEffect(() => {
    configureHeader({
      placeholder: "Buscar Entre Hojas",
      showBackButton: true,
      showShadow: true,
    })
  }, [])

  const categories = [
    {name: "Ofertas", amount: 0},
    {name: "Singonio", amount: 4},
    {name: "Potus", amount: 3},
    {name: "Monstera", amount: 2}
  ]

  return (
    <main className="bg-bg-light h-[calc(100svh-3rem)] min-w-screen flex flex-col items-center font-Outfit text-black">
      <div className="w-full flex flex-col gap-6 mt-24">
        {categories.map((category, index) => (
          <div key={index} className="w-full px-2 flex justify-between items-center gap-2 border-b border-black cursor-pointer">
            <span className="text-3xl">{category.name}</span>
            {category.amount > 0 && <span className="text-md text-black/80">{category.amount} variedades</span>}
          </div>
        ))}
      </div>
    </main>
  )
}
