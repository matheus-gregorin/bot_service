
// Css
import "./css/Kpis.css"

// Tools

const Kpis = ({ lists }) => {

    const months = [ 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro' ]
    const datas = { 'janeiro': 0, 'fevereiro': 0, 'março': 0, 'abril': 0, 'maio': 0, 'junho': 0, 'julho': 0, 'agosto': 0, 'setembro': 0, 'outubro': 0, 'novembro': 0, 'dezembro': 0 }

    lists.map((list) => {
        const currentYear = new Date().getFullYear().toString();
        const date = new Date(list.created_at);

        const year = date.toLocaleString("pt-BR", { year: "numeric" });
        const monthName = date.toLocaleString("pt-BR", { month: "long" });

        if(year === currentYear){
            datas[monthName] += 1
        }
        return true
      });

      const HandleColor = ( value ) => {
        if(value >= 5){
            return "blues"
        } else if ( value < 5 && value >= 2){
            return "yellow"
        } else {
            return "red"
        }
      }

    return (
        <div className="kpis">
            <label htmlFor="orders"> Pedidos por Mês: </label>
            <div className="kpis-container">
                <div className="orders" id="orders">
                    {
                        months.map((month, i) => ( 
                            <div className={"kpis-card-" + HandleColor(datas[month])} id="month" key={i}>  
                                <div className="options"> 
                                    { month.toUpperCase() }
                                    <select className="option"> 
                                        <option value=""> ... </option>
                                        <option value=""> ABC </option>
                                    </select>
                                </div> 
                                <p> { datas[month] } </p> 
                            </div> 
                        ))
                    }
                </div>

            </div>
        </div>
    )
}

export default Kpis