import styles from './Header.module.css';

function Header () {
    return (
    <>
        <h1 className={styles.appTitle}>Prime Pizza</h1>
        <p className={styles.totalCost}>Total:</p>
    </>
    )
}

export default Header;