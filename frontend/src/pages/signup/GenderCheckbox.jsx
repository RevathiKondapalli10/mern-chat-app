

const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
	const handleGenderChange = (e) => {
		onCheckboxChange(e.target.value);
	};

	return (
		<div className='flex flex-col my-4'>
			<label className='label'>
				<span className='text-base label-text'>Gender</span>
			</label>
			<div className='flex items-center space-x-4'>
				<label className='flex items-center space-x-2'>
					<input
						type='radio'
						name='gender'
						value='male'
						checked={selectedGender === "male"}
						onChange={handleGenderChange}
					/>
					<span>Male</span>
				</label>
				<label className='flex items-center space-x-2'>
					<input
						type='radio'
						name='gender'
						value='female'
						checked={selectedGender === "female"}
						onChange={handleGenderChange}
					/>
					<span>Female</span>
				</label>
				<label className='flex items-center space-x-2'>
					<input
						type='radio'
						name='gender'
						value='other'
						checked={selectedGender === "other"}
						onChange={handleGenderChange}
					/>
					<span>Other</span>
				</label>
			</div>
		</div>
	);
};

export default GenderCheckbox;


















// const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
// 	return (
// 		<div className='flex'>
// 			<div className='form-control'>
// 				<label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""} `}>
// 					<span className='label-text'>Male</span>
// 					<input
// 						type='checkbox'
// 						className='checkbox border-slate-900'
// 						checked={selectedGender === "male"}
// 						onChange={() => onCheckboxChange("male")}
// 					/>
// 				</label>
// 			</div>
// 			<div className='form-control'>
// 				<label className={`label gap-2 cursor-pointer  ${selectedGender === "female" ? "selected" : ""}`}>
// 					<span className='label-text'>Female</span>
// 					<input
// 						type='checkbox'
// 						className='checkbox border-slate-900'
// 						checked={selectedGender === "female"}
// 						onChange={() => onCheckboxChange("female")}
// 					/>
// 				</label>
// 			</div>
// 		</div>
// 	);
// };
// export default GenderCheckbox;

// STARTER CODE FOR THIS FILE
// const GenderCheckbox = () => {
// 	return (
// 		<div className='flex'>
// 			<div className='form-control'>
// 				<label className={`label gap-2 cursor-pointer`}>
// 					<span className='label-text'>Male</span>
// 					<input type='checkbox' className='checkbox border-slate-900' />
// 				</label>
// 			</div>
// 			<div className='form-control'>
// 				<label className={`label gap-2 cursor-pointer`}>
// 					<span className='label-text'>Female</span>
// 					<input type='checkbox' className='checkbox border-slate-900' />
// 				</label>
// 			</div>
// 		</div>
// 	);
// };
// export default GenderCheckbox;
