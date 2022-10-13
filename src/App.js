import React, {useState, useEffect} from 'react'

function App() {

  const [civs, setCivs] = useState([])

  useEffect(() => {
      const fetchCivs = async () => {       

          const response = await fetch("https://thingproxy.freeboard.io/fetch/https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations")
          const {civilizations} = await response.json()            
          
          setCivs(civilizations.map(civ => (
            localStorage.getItem("selectedCiv") !== null && civ.name === localStorage.getItem("selectedCiv") ?
            {...civ, selected: true} :
            {...civ, selected: false}
          )))
      }

      fetchCivs()
  }, [])

  const selectCiv = (id) => {
     setCivs(prevCivs => prevCivs.map(civ => (
         civ.id === id ?
         {...civ, selected: true}:
         {...civ, selected: false}
     )))

     localStorage.setItem('selectedCiv', civs.find(civ => civ.id === id).name);
  }

  const civList = civs.map((civ, index) => {
    return (
      <tr key={civ.id} className={`border-b ${civ.selected ? "bg-green-200" : index%2 === 0 ? "bg-gray-100" : "bg-white"} hover:cursor-pointer`} onClick={() => selectCiv(civ.id)}>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {civ.name}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {civ.army_type}
        </td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          {civ.expansion}
        </td>
      </tr>
    )
  })

  const selectedCiv = civs.find(civ => civ.selected)

  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-lg text-gray-900 font-medium mx-auto">Age of Empire 2 Civilizations</h1>    
      <h3 className="text-md text-gray-900 font-light mx-auto">Selected civilization: {selectedCiv ? selectedCiv.name : localStorage.getItem("selectedCiv") !== "null" ? localStorage.getItem("selectedCiv") : "None"}</h3>            
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th scope="col" className="text-sm font-medium bg-gray-700 text-gray-300 px-6 py-4 text-left font-bold">
                    Name
                  </th>
                  <th scope="col" className="text-sm font-medium bg-gray-700 text-gray-300 px-6 py-4 text-left font-bold">
                    Army Type
                  </th>
                  <th scope="col" className="text-sm font-medium bg-gray-700 text-gray-300 px-6 py-4 text-left font-bold">
                    Expansion
                  </th>
                </tr>
              </thead>
              <tbody>
                {civList}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
