

export const ClientsList = () => {
    return (
        <main className="main">
        <header className="header">
            <div className="search">
                <input type="text" id="searchInput"  className="input" placeholder="Пошук користувача..."/>
                <button className="btn">Пошук</button>
            </div>
            <span className="badge">UA</span>
        </header>

        <section className="content">
            <div style= {{display:"flex",justifyContent: "space-between", alignItems:"center"}} >
                <h2>Список клієнтів</h2>
                <a className="btn" href="@{/users/create}"
                   style= {{padding:"8px 16px", background:"#4CAF50", color:"white", textDecoration: "none", borderRadius:"5px"}} >
                    ➕ Додати клієнта
                </a>
            </div>

            <table id="usersTable" className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Ім’я </th>
                    <th>Номер телефону</th>
                    <th>Email</th>
                    <th>Адреса</th>
                </tr>
                </thead>
                <tbody>
                
                <Client/>


                </tbody>
            </table>
        </section>
    </main>
    )
}; 