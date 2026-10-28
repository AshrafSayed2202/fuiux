const ContactInput2 = ({ error }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="668" height="48" viewBox="0 0 668 48" fill="none">
      <path d="M668 48H20.9905L0 25.5652V0H643.104L668 24V48Z" fill="white" fillOpacity="0.02" />
      <path d="M642.901 0.5L667.5 24.2119V47.5H21.207L0.5 25.3672V0.5H642.901Z" stroke={error ? "#FF0033" : "white"} strokeOpacity={error ? "1" : "0.1"} />
    </svg>
  )
}
export default ContactInput2