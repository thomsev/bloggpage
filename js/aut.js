const options = {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....',
    },
  }
  const response = await fetch(`${API_BASE_URL}/api/v1/quotes`, options)
  const data = await response.json()