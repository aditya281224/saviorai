
const CoverLetter = async ({params}) => {
  const id = await params.id; 
  return (
    <div>
      CoverLetter:{id}
    </div>
  )
}

export default CoverLetter
