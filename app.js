const layout = document.querySelector('.layout')
const width = 35;
const height = 20;
const throwSnow = document.querySelector('.throw img')
const topMove = document.querySelector('.top')
const rightMove = document.querySelector('.right')
const downMove = document.querySelector('.down')
const leftMove = document.querySelector('.left')

for(let i=0; i<width*height; i++){
    const square = document.createElement('div')
    layout.appendChild(square)
}
let santaPos = 'santa';
const squares = Array.from(document.querySelectorAll('.layout div'))

let SantaIndex = 78
squares[SantaIndex].classList.add('santa')

const tree = [72, 106, 107, 116, 117, 52, 87, 329, 330, 347, 382, 383, 408, 409, 511, 512, 546, 547, 625, 660]
for(let idx = 0; idx<tree.length; idx++){
    squares[tree[idx]].classList.add('tree')
}

function santaIdx() {
    squares[SantaIndex].classList.remove('santa')
    squares[SantaIndex].classList.remove('santaBack')
    squares[SantaIndex].classList.remove('santaTop')
    squares[SantaIndex].classList.remove('santaDown')
}
function moveTop() {
        if(SantaIndex < squares.length-width*4){
            window.scrollBy({
                top: -400,
                behavior: 'smooth'
            })
            
        }
        if(SantaIndex < width){
            squares[SantaIndex].classList.add('santaTop')
            return;
            
        }
        SantaIndex -= width;
        if(squares[SantaIndex].classList.contains('tree')){
            SantaIndex += width;
        } 
        squares[SantaIndex].classList.add('santaTop')
        santaPos = 'santaTop';
}
function moveRight() {
    if(SantaIndex%width >= width-15){
        window.scrollBy({
            left: 400,
            behavior: 'smooth'
        })
        
    }
    if(SantaIndex%width === width-1){
        squares[SantaIndex].classList.add('santa')
        return
    }
    SantaIndex += 1;
    if(squares[SantaIndex].classList.contains('tree')){
        SantaIndex -= 1;
    }
    squares[SantaIndex].classList.add('santa')
    santaPos = 'santa';
        
}
function moveDown() {
    if(SantaIndex > squares.length/4){
        window.scrollBy({
            top: 400,
            behavior: 'smooth'
        })
    }
    if(SantaIndex > squares.length-width){
        squares[SantaIndex].classList.add('santaDown')
        return;
    }
    SantaIndex += width;
    if(squares[SantaIndex].classList.contains('tree')){
        SantaIndex -= width;
    }
    squares[SantaIndex].classList.add('santaDown')
    santaPos = 'santaDown';
}


function moveLeft() {
    if(SantaIndex%width <= width-15){
        window.scrollBy({
            left: -400,
            behavior: 'smooth'
        })
        
    }
    if(SantaIndex%width === 0){
        squares[SantaIndex].classList.add('santaBack')
        return
    }
    SantaIndex -= 1;
    if(squares[SantaIndex].classList.contains('tree')){
        SantaIndex += 1;
    } 
    squares[SantaIndex].classList.add('santaBack')
    santaPos = 'santaBack';
}
function moveSanta(e){

    santaIdx()

    if(e.key === 'w') {
        moveTop();
    } 
    else if(e.key === 's') {
        moveDown();
    } 
    else if(e.key === 'a') {
        moveLeft();
    }
    else if(e.key === 'd') {
        moveRight();
    } 
    squares[SantaIndex].classList.add(santaPos)

}
topMove.addEventListener('click', ()=> {
    
    santaIdx()
    moveTop()
})
rightMove.addEventListener('click', ()=> {
    santaIdx()
    moveRight()
    
})
downMove.addEventListener('click', ()=> {
    santaIdx()
    moveDown()
    
})
leftMove.addEventListener('click', ()=> {
    santaIdx()
    moveLeft()
})
document.addEventListener('keydown', moveSanta)

let snowballInterval;



let snowballIdx;
function moveSnowball(snowballIdx) {
    snowballIdx =  SantaIndex
    squares[snowballIdx].classList.remove('snowball')
    if(santaPos == 'santa'){
        snowballIdx += 1
        squares[snowballIdx].classList.add('snowball')
    } else if(santaPos == 'santaTop'){
        snowballIdx -= width;
        squares[snowballIdx].classList.add('snowball')
    } else if(santaPos == 'santaBack'){
        snowballIdx -= 1
        squares[snowballIdx].classList.add('snowball')
    } else if(santaPos == 'santaDown'){
        snowballIdx += width
        squares[snowballIdx].classList.add('snowball')
    }
}
function throwSnowBall(e){
    if(e.key === 'ArrowUp'){
        moveSnowball(snowballIdx);
    }
    
}
document.addEventListener('keydown', throwSnowBall)
throwSnow.addEventListener('click',  () => {
    
    moveSnowball(snowballIdx)
    
    
    
})