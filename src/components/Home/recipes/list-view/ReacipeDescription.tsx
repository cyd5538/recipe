import React from 'react'

interface Prop {
  description: string;
}

const ReacipeDescription:React.FC<Prop> = ({description}) => {

  const plainText = description.replace(/<[^>]*>/g, "")
  const sliceText = plainText.length > 55 ? plainText.slice(0,55) + "..." : plainText

  return (
    <div className='max-w-[250px] break-words line-clamp mb-4'>
      {sliceText}
    </div>
  )
}

export default ReacipeDescription
