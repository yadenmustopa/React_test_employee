import React, { Fragment, useReducer, useEffect, useRef  } from 'react'

const initialState = {
	name        : "",
	position    : "",
	salary      : "",
	hasChanged  : "",
	isEditable  : false,
}


const reducer = ( state, action ) => {
	if (action.type === "reset") {
		return initialState;
	}

	const result        = { ...state };
	result[action.type] = action.value;

	return result;
}


const Employee = ({idx, data, onUpdateClicked, triggerReset }) => {
const [ state, dispatch ] = useReducer( reducer, initialState );
const { name, position, salary, hasChanged, isEditable } = state; 
const inputForEditable = useRef();

useEffect( ()=> {
	if( triggerReset ) return reset();
},[ triggerReset ]);

function buttonHasClicked()
{
	const listUpdated = {
	name      : ( name ) ? name : data.name,
	position  : ( position ) ? position : data.position,
	salary    : ( salary ) ? salary : data.salary,
	id        : idx,
	}
	onUpdateClicked( listUpdated ); 
}



function reset()
{
	dispatch({ type : 'reset' });
}

const onChange = e => {
	const { name, value } = e.target;

	dispatch({ type: name, value : ( name === 'salary') ? parseInt( value ) : value });
	dispatch({ type: 'hasChanged', value : name });
	
};


const toEditable = () => {
	dispatch({ type : 'isEditable', value: true });
	if( inputForEditable.current ){
	inputForEditable.current.focus();
	}
}

return (
	<Fragment>
	<td>
		{ data.name }
	</td>
	<td className='pl-20'>
		{ data.position }
	</td>
	<td className='pl-20'>
		<div
		data-testid = {'employee-salary-div-' + idx}
		onClick     = { toEditable }
		>
		{ isEditable ? (
			<input
				data-testid = { 'employee-salary-input-' + idx }
				type        = 'number'
				name        = "salary"
				disabled    = { ( !data.name || !data.position )   }
				value       = { ( salary  || hasChanged === 'salary' ) ? salary : data.salary }
				onChange    = { onChange }
				ref         = { inputForEditable }
			/>
		) :   data.salary   }
		</div>
	{/* use this block of code when the salary field becomes editable */}
	</td>
	<td className='pl-20'>
		<button
		className   = { 'x-small w-75 ma-0 px-25' }
		data-testid = { 'employee-save-button-' + idx }
		disabled    = { ( !salary && !position && !name )  }
		onClick     = { buttonHasClicked }
		>
		Save
		</button>
	</td>
	</Fragment>
)
}


export default Employee
