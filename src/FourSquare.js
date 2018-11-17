const api = 'https://api.foursquare.com/v2/'
//Replace your foursquare APIs here:
//'P5RRR553LEJUNRFMT4GWNNZ3XVOFSSF0VV35PN4NNJUBA5DI'
const client_id =  'S1EFHUKMT0OCKWQWGLZHLSZVDCOM24QCUSVI5Z1WSAOPUVW0'
//'PPGB5AIAUWWGJNZIZK4S4AUD4JXZLJGJLPGHWG0HROPMBJRP'
const client_key = 'K0J4M2FKX4C1OWONTWW204DADGMUBVBVEN4M4OESVQLYSNGN'


// const getVenue = (id)=>
//     fetch(`${api}venues/${id}?client_id=${client_id}&client_secret=${client_key}&v=20180323`)
//     .then( res =>res.json())

 const venuesAPI = ()=>
    fetch(`${api}venues/explore?near=tirupati&topic=food&limit=10&client_id=${client_id}&client_secret=${client_key}&v=20180323`)
    .then( res=> res.json() )
    .catch(reason=>{
        alert("Fialed to receive data from Foursquare\nMake sure you have added client id and secret code or check your rate limit");
        console.log(reason)
    })

export const parseMarkers = ()=>
    venuesAPI()
    .then(res =>  res.response.groups[0].items.map(item =>{
        return {name:item.venue.name, id:item.venue.id, lat:item.venue.location.lat, lng:item.venue.location.lng, rating:item.venue.rating, show:true, selected:false}
        })
    ).catch(reason=>{
        alert("Fialed to receive data from Foursquare\nMake sure you have added client id and secret code or check your rate limit");
        console.log(reason)
})

const photoAPI = (venueId)=>
    fetch(`${api}venues/${venueId}/photos?limit=1&client_id=${client_id}&client_secret=${client_key}&v=20180323`)
    .then(res=>res.json())
    .catch(reason=>console.log(reason))

export const getPhotoUrl = (venueId)=>
    photoAPI(venueId)
        .then(res=>`${res.response.photos.items[0].prefix}300x300${res.response.photos.items[0].suffix}`)
        .catch(reason=>{
            alert("Fialed to receive data from Foursquare\nMake sure you have added client id and secret code or check your rate limit");
            console.log(reason)
        })
     




