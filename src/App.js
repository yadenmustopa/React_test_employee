import React, { Fragment, useState  } from 'react'
import 'h8k-components'

import { AddEmployee, Employee } from './components'

const title = 'Editable Table'

const employeesList = [
  { id: 0, name: 'Chris Hatch', position: 'Software Developer', salary: 130000 },
  { id: 1, name: 'Elizabeth Montgomery', position: 'Lead Research Engineer', salary: 70000 },
  { id: 2, name: 'Aiden Shaw', position: 'Machine Learning Engineer', salary: 80000 },
]

const App = ()=>{

  const [ lists, setList ] = useState( employeesList );
  const [ triggerResetAdd, setTriggerResetAdd ] = useState( false );
  const [ triggerResetUpdate, setTriggerResetUpdate ] = useState( false );

  const addEmployee = ( newList ) => 
  {
    let duplicateSalary = salaryIsDuplicate( newList );
    if( duplicateSalary ) return;
    let id  = lists.length;
    newList = { ...newList, id }
  
    setList([ ...lists, newList ]);
    setTriggerResetAdd( true );
    resetToFalse( setTriggerResetAdd );
  }
  
  const updateEmployee = ( listChanged ) => 
  {
    if( salaryIsDuplicate( listChanged ) ) return;

    let newState  = lists.map( item => {
        if( item.id === listChanged.id ){
          return listChanged;
        }
        return item;
    } );

    setList( newState );
    setTriggerResetUpdate( true );
    resetToFalse( setTriggerResetUpdate );
  }

  const resetToFalse = ( setTrigger  ) =>
  {
    setTimeout(() => {
      setTrigger( false );
    }, 100 );
  }

  const salaryIsDuplicate = ( newList ) => 
  {
    // if( parseInt(newList.salary) === 0 || !newList.salary ) return true;

    // let salaryIsDuplicate = lists.filter( list => { 
    //   return list.salary === parseInt(newList.salary)}
    // );

    // if( salaryIsDuplicate.length > 0  ) return true;
    return false;
  }


  return (
    <Fragment>
      <h8k-navbar header={ title }></h8k-navbar>
      <div className="card w-45 mx-auto mt-75 pb-5">
        <table data-testid='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              { lists.map((employee, idx) => (
                <tr key={ employee.id } data-testid={ `row-${idx}` }>
                  <Employee 
                    idx               = { idx } 
                    data              = { employee }
                    onUpdateClicked   = { updateEmployee }
                    triggerReset      = { triggerResetUpdate }    
                  />
                </tr>
              ))}
              <tr>
                <AddEmployee 
                  addEmployeeClicked = { addEmployee } 
                  triggerReset       = { triggerResetAdd }
                />
              </tr>
            </tbody>
          </table>
      </div>
    </Fragment>
  )
}

export default App
