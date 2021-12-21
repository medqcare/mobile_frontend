export default function getFullName(userData) {
  const { firstName, lastName } = userData;

  return lastName ? `${firstName} ${lastName}` : firstName;
}
