import styles from './Header.module.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';

function Header() {
  const orderInfo = useSelector((state) => state.orderInfo);

  return (
    <div className={styles.appHeader}>
      <span className={styles.appTitle}>Prime Pizza</span>
      <span className={styles.totalCost}>
        <ShoppingCartIcon sx={{ fontSize: 24 }} /> Total: $
        {orderInfo.totalPrice}
      </span>
    </div>
  );
}

export default Header;
