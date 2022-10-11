import React, { Fragment, useEffect, useReducer } from 'react'

const initialState = {
    name        : "",
    position    : "",
    salary      : "",
}


const reducer = ( state, action ) => {
    if (action.type === "reset") {
        return initialState;
    }

    const result = { ...state };
    result[action.type] = action.value;

    return result;
}


const AddEmployee = ( { addEmployeeClicked, triggerReset } ) => {
    const [ state, dispatch ]        = useReducer( reducer, initialState );
    const { name, position, salary } = state; 

    useEffect( ()=> {
        if( triggerReset ) return reset();
    },[ triggerReset ]);

    function buttonHasClicked()
    {
        addEmployeeClicked( { name, position, salary } ); 
    }


    const onChange = e => {
        const { name, value } = e.target;
    
        dispatch({ type: name, value : ( name === 'salary') ? parseInt( value ) : value });
    };


    function reset()
    {
        dispatch({ type : 'reset' });
    }

    return (
        <Fragment>
            <td className='pl-30'>
                <input
                    data-testid ='new-employee-name-input'
                    placeholder ='Enter Name'
                    name        = 'name'
                    value       = { name }
                    onChange    = { onChange }
                />
            </td>
            <td className ='pl-20'>
                <input
                data-testid ='new-employee-position-input'
                placeholder ='Enter Position'
                name        = 'position'
                value       = { position }
                onChange    = { onChange }
                />
            </td>
            <td className='pl-20'>
                <input
                data-testid ='new-employee-salary-input'
                type        ='number'
                name        = 'salary'
                placeholder ='Enter Salary'
                value       = { salary }
                onChange    = { onChange }
                disabled    = { ( !name || !position ) }
                />
            </td>
            <td className='pl-20'>
                <button
                    data-testid   ='add-new-employee-button'
                    className     ='x-small w-75 ma-0 px-25'
                    disabled      = { ( !salary || !name || !position ) }
                    onClick       = { buttonHasClicked }
                >
                {(!salary)?'Add' : 'Save'}
                </button>
            </td>
        </Fragment>
    )
}

export default AddEmployee
