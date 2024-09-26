import { useRouter } from "next/router";
import ALink from "~/components/features/custom-link";
import { useCategories } from "hooks";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import styles from "./simpleMainMenuStyles.module.scss";

function SimpleMainMenu() {
  const { categories } = useCategories({
    take: 10,
    random: true,
  });
  const router = useRouter();

  const handleRedirect = (categoryId) => {
    router.push({
      pathname: "/shop",
      query: { category: categoryId },
    });
  };

  return (
    <nav className={styles.simpleMenu}>
      <List component="nav" className={styles.horizontalList}>
        <div className={styles.menuItem}>
          <ListItem button onClick={() => router.push("/shop")}>
            <ListItemText primary="Todas" />
          </ListItem>
        </div>
        <Divider orientation="vertical" flexItem />

        {categories.map((category) => (
          <div key={category.id} className={styles.menuItem}>
            <ListItem button onClick={() => handleRedirect(category.id)}>
              <ListItemText primary={category.name} />
            </ListItem>
            <Divider orientation="vertical" flexItem />
          </div>
        ))}
      </List>
    </nav>
  );
}

export default SimpleMainMenu;
