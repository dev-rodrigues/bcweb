export function calculateTimeDifference(createdAt: string): string {
  const createdDate = new Date(createdAt)
  const now = new Date()
  const difference = Math.floor((now.getTime() - createdDate.getTime()) / 60000) // Difference in minutes

  if (difference < 1) {
    return 'Agora mesmo'
  } else if (difference < 60) {
    return `Há ${difference} minutos`
  } else if (difference < 1440) {
    const hours = Math.floor(difference / 60)
    return `Há ${hours} hora${hours > 1 ? 's' : ''}`
  } else {
    const days = Math.floor(difference / 1440)
    return `Há ${days} dia${days > 1 ? 's' : ''}`
  }
}
