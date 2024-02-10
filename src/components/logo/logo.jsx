import styles from './logo.module.css'

const Logo = () => (
  <header>
    <img className={styles.imgLogo} src="logo-espaco-mulher.png" alt="Logo Espaço Mulher" />
    <h1>Espaço Mulher</h1>
  </header>
)

export { Logo }