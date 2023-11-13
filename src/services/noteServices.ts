export const updateNote = async ({ note, id, token }: { note: { body: string, title: string }, id: string, token: string }) => {
  try {
    await fetch('http://localhost:4000/api/notes/'+id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(note)
    })

  } catch (error) {
   console.log(error) 
  }
}

export const deleteNote = async ({ id, token }: { id: string, token: string }) => {
  try {
    await fetch('http://localhost:4000/api/notes/'+id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  } catch (error) {
    console.log(error)
  }
}