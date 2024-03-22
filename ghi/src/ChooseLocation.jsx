// import { useEffect, useState } from 'react';
// import { Select } from 'flowbite-react'

// export default function ChooseLocation({ handleLocationChange }) {

//     const [locations, setLocations] = useState([]);
//     const [selectedLocation, setSelectedLocation] = useState('');

//     const getLocations = async function() {
//         // const url = `${VITE_API_HOST}/locations`
//         const url = `http://localhost:8000/locations/list/`
//         const response = await fetch(url)

//         if (!response.ok) {
//             throw new Error ('Bad fetch response for Locations');
//         } else {
//             const data = await response.json();
//             setLocations(data);
//         }
//     }


//     const handleSelectChange = (event) => {
//         const selectedValue = event.target.value;
//         setSelectedLocation(selectedValue);
//         handleLocationChange(selectedValue)
//     }

//     useEffect(() => {
//         getLocations();
//     }, [])


//     return (
//         <Select
//             id="location_id"
//             placeholder="Choose a Location"
//             onChange={handleSelectChange}
//             value={selectedLocation}
//             required
//         >
//             <option defaultValue="">Choose a Location</option>
//             {locations.map((local) => {
//                 return (
//                     <option key={local.id} value={local.id}>
//                         {local.city}, {local.state_abbrev}
//                     </option>
//                 )
//             })}
//         </Select>
//     )
// }
