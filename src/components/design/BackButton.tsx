import { IconButton, Tooltip } from "@material-ui/core"
import { useRouter } from "next/dist/client/router"
import { ArrowBack } from "@material-ui/icons"

const BackButton = (props: any) => {
  const router = useRouter()
  const link = props.link
  return (
    <Tooltip title="Back">
      <IconButton
        className={props.className}
        color="primary"
        onClick={() => {
          router.push(link)
        }}
      >
        <ArrowBack />
        &nbsp;BACK
      </IconButton>
    </Tooltip>
  )
}

export default BackButton
