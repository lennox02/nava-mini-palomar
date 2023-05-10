import React, {useState, useEffect} from 'react';
import './App.css';
import companies from './data.json';

function App() {
  const firstShown: {[index: string]:any} = {}
  const [shown, setShown] = useState(firstShown);

  const showHide = (index: string | number) => {
    setShown({...shown, [index + ""]: !shown[index + ""]});
  }

  useEffect(() => {
    //set the "shown" object so we have shown/hidden statuses for each company
    if(companies && companies.length > 0) {
      let tempShown: {[index: string]:any} = {}
      companies.forEach(function(company, i){
        tempShown[i+""] = false;
      });
      setShown(tempShown);
    }
  }, []);

  return (
    <div className="App">
      {companies.map(function(company, i){
        return (
          <div className="card">
            <div className="cardHeader">{company.company_name}</div>
            <table className="cardTable">
              <tr>
                <td>State</td>
                <td>Employees</td>
                <td>Year</td>
              </tr>
              <tr>
                <td className="cardTableBoldCell">{company.company_state}</td>
                <td className="cardTableBoldCell">{company.employee_count}</td>
                <td className="cardTableBoldCell">{company.plan_year}</td>
              </tr>
            </table>
            <div className="showMore"><a href="#" onClick={() => showHide(i)}>{shown[i+""] ? "Show less ▲" : "Show more ▼"}</a></div>
            <div className={shown[i+""] ? "moreSectionHidden" : "moreSection"}>
              <div className="moreInnerContainer">
                <div className="moreRow"><span style={{fontWeight: "bold"}}>Premium:</span> ${(company.premium_sum).toLocaleString("en-US")}</div>
                <div className="moreRow"><span style={{fontWeight: "bold"}}>Participants:</span> {company.participants_sum}</div>
                <div className="moreRow"><span style={{fontWeight: "bold"}}>Broker Commissions:</span> ${(company.broker_commission_sum).toLocaleString("en-US")}</div>
              </div>
            </div>
          </div>
        );
        })
      }
    </div>
  );
}

export default App;
