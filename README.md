# embroidery-shop-frontend

Frontend side of embroidery-shop-backend application.

Functionality and informations about backend side of project are available at: <https://github.com/NorbertWojtowicz/embroidery-shop-backend>

(The test server is no longer available)

~~Testing version is available at: <http://34.135.102.223>~~

# Short description of frontend project 

## Navbar section
NavBar has 4 buttons (1 if you are signed out, 3 if you are signed in but u are not an admin):
- Panel admina (Navigates to admin panel - description in *Admin panel* section)
- Zamówienia (Navigates to site with all orders of currently signed in user)
- Koszyk (Navigates to cart site with list of added products, sum up and and checkout button)
- Wyloguj (Button responsible for signing out)

## Main page products section
Products section on main page consists of list of products, categories menu, where You can sort products by selected category, and sorting bar, where You can sort products by price, date and name (each ascending or descending).

## Admin panel
Admin panel consists of menu with four sections:
- Menedżer produktów (Product manager is responsible for editing products and deleting then)
- Menedżer zamówień (Order manager is responsible for completing orders and checking payment status)
- Menedżer kategorii (Category manager is responsible for editing categories, deleting them and creating new ones)
- Kreator produktów (Product creator is responsible for creating new products)
