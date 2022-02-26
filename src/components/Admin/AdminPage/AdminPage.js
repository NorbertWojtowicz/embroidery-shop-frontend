import './AdminPage.css';
import {useEffect, useState} from "react";
import axios from "axios";

const AdminPage = () => {

    const [isAdmin, setAdmin] = useState(false);
    const token = decodeURI(document.cookie.split("=")[1]);
    useEffect(() => {
        async function fetchProfileData() {
            await axios.get("http://localhost:8080/profile/details", {
                headers: {'Authorization': token}
            })
                .then(res => {
                    res.data.roles.includes("ADMIN") ? setAdmin(true) : setAdmin(false);
                })
                .catch(err => setAdmin(false));
        }
        fetchProfileData();
    }, [token]);

    console.log(isAdmin);

    return (
        <div>
            {!isAdmin ? "" :
                <div className="admin-page-container">
                    <div className="components-wrapper">
                        <div className="component background-darkmagenta">
                            <h3>Menedżer produktów</h3>
                            <hr/>
                            <a href={"/admin/menedzer-produktow"}><h5 className="background-darkmagenta"><p>Przejdź do komponentu -></p></h5></a>
                        </div>
                        <div className="component background-lightblue">
                            <h3>Menedżer zamówień</h3>
                            <hr/>
                            <a href={"/admin/menedzer-zamowien"}><h5 className="background-lightblue"><p>Przejdź do komponentu -></p></h5></a>
                        </div>
                        <div className="component background-darkcyan">
                            <h3>Menedżer kategorii</h3>
                            <hr/>
                            <a href={"/admin/menedzer-kategorii"}><h5 className="background-darkcyan"><p>Przejdź do komponentu -></p></h5></a>
                        </div>
                        <div className="component background-darkred">
                            <h3>Kreator produktów</h3>
                            <hr/>
                            <a href={"/admin/kreator-produktow"}><h5 className="background-darkred"><p>Przejdź do komponentu -></p></h5></a>
                        </div>
                    </div>
                </div>
            }
        </div>
        );
}

export default AdminPage;
