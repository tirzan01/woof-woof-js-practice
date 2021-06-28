document.addEventListener('DOMContentLoaded', () => {
    
    fetchAndReturn()
    
    document.getElementById('good-dog-filter').addEventListener('click', () => {
        if(document.getElementById('good-dog-filter').innerText === 'Filter good dogs: OFF'){
            while(document.getElementById('dog-bar').firstChild){
                document.getElementById('dog-bar').firstChild.remove()
            }
            document.getElementById('good-dog-filter').innerText = 'Filter good dogs: ON'
            fetchAndReturn(true)
        }else{
            while(document.getElementById('dog-bar').firstChild){
                document.getElementById('dog-bar').firstChild.remove()
            }
            fetchAndReturn()
            document.getElementById('good-dog-filter').innerText = 'Filter good dogs: OFF'
        }
    })

})
const fetchAndReturn = 
(filterActive = false) => {
    fetch('http://localhost:3000/pups')
        .then(resp => resp.json())
        .then(json => {
            if(!filterActive){
                json.forEach(
                    e =>  {          
                        document.getElementById('dog-bar').innerHTML += `<span class = 'dogs'>${e.name}</span>`
                    }
                )

                const dogs = document.querySelectorAll('.dogs')

                for (let i = 0; i < dogs.length; i++) {
                    dogs[i].addEventListener('click', e => {
                        while(document.getElementById('dog-info').firstChild){
                            document.getElementById('dog-info').firstChild.remove()
                        }
                        document.getElementById('dog-info').innerHTML += 
                        ` <img src = '${json[i].image}'></img>
                        <h1>${json[i].name}</h1>
                        <button id = 'goodBadDog'>${json[i].isGoodDog ? 'Bad Dog!' : 'Good Dog'}</button>`     
                                        
                        document.getElementById('goodBadDog').addEventListener('click', e => {
                            if (document.getElementById('goodBadDog').innerText === 'Bad Dog!') {
                                document.getElementById('goodBadDog').innerText = 'Good Dog!'
                                fetch(`http://localhost:3000/pups/${json[i].id}`, {
                                    method: 'PATCH',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },

                                    body: JSON.stringify({
                                        'isGoodDog' : false
                                    })
                                })
                            }else{
                                document.getElementById('goodBadDog').innerText = 'Bad Dog!'
                                fetch(`http://localhost:3000/pups/${json[i].id}`, {
                                    method: 'PATCH',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },

                                    body: JSON.stringify({
                                        'isGoodDog' : true
                                    })
                                })
                            }
                        })
                    })
                
                }        
            }else{
                let goodDogs = json.filter(dog => dog.isGoodDog === true)
                goodDogs.forEach(
                    e =>  {          
                        document.getElementById('dog-bar').innerHTML += `<span class = 'dogs'>${e.name}</span>`
                    }
                )
                const dogs = document.querySelectorAll('.dogs')

                for (let i = 0; i < dogs.length; i++) {
                    dogs[i].addEventListener('click', e => {
                        while(document.getElementById('dog-info').firstChild){
                            document.getElementById('dog-info').firstChild.remove()
                        }
                        document.getElementById('dog-info').innerHTML += 
                        ` <img src = '${goodDogs[i].image}'></img>
                        <h1>${goodDogs[i].name}</h1>
                        <button id = 'goodBadDog'>${goodDogs[i].isGoodDog ? 'Bad Dog!' : 'Good Dog'}</button>`
                        document.getElementById('goodBadDog').addEventListener('click', e => {
                            if (document.getElementById('goodBadDog').innerText === 'Bad Dog!') {
                                document.getElementById('goodBadDog').innerText = 'Good Dog!'
                                fetch(`http://localhost:3000/pups/${goodDogs[i].id}`, {
                                    method: 'PATCH',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },

                                    body: JSON.stringify({
                                        'isGoodDog' : false
                                    })
                                })
                            }else{
                                document.getElementById('goodBadDog').innerText = 'Bad Dog!'
                                fetch(`http://localhost:3000/pups/${goodDogs[i].id}`, {
                                    method: 'PATCH',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },

                                    body: JSON.stringify({
                                        'isGoodDog' : true
                                    })
                                })
                            }
                        })
                    })
                
                }                       
            }           
        })
}