import styles from "./index.module.scss"

const FloatingDiv = (props: any) => {
  return (
    <div className={styles.floatingDiv}>
      <div className={styles.content}>{props.children}</div>
    </div>
  )
}

export default FloatingDiv
