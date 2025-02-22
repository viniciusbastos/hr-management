import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react'

const CardDashboard = (props: {
  title: string
  quant: number
  info: string
  link: string
  color: string
  darkColor: string
}) => {
  const navigate = useNavigate()
  function handleClick() {
    navigate(props.link)
  }
  return (
    <div
      className={`p-10 ${props.color} dark:${props.darkColor} rounded-xl shadow-xl border-spacing-1`}
      onClick={handleClick}
    >
      <div className="shrink-0">
        <div className="text-2xl font-medium text-gray-800 dark:text-gray-200 font-sans">
          {props.title}
        </div>
        <h2 className="text-2xl text-gray-600 dark:text-gray-400  font-sans">
          {props.quant}
        </h2>
        <p className="text-gray-400 font-sans dark:text-gray-400">
          {props.info}
        </p>
      </div>
    </div>
  )
}

export default CardDashboard
