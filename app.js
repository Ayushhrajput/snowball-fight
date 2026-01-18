const layout = document.querySelector('.layout')
const width = 70;
const height = 40;
const throwSnow = document.querySelector('.throw img')
const topMove = document.querySelector('.top')
const rightMove = document.querySelector('.right')
const downMove = document.querySelector('.down')
const leftMove = document.querySelector('.left')
const reload = document.querySelector('.reload')
const res = document.querySelector('.res')

for(let i=0; i<width*height; i++){
    const square = document.createElement('div')
    layout.appendChild(square)
}
let santaPos = 'santa';
const squares = Array.from(document.querySelectorAll('.layout div'))

let SantaIndex = 640
squares[SantaIndex].classList.add('santa')

const tree = [
            283, 284, 353, 354, 355, 423, 424, 425, 493, 494, 495, 563, 564, 565,
            303, 304, 372, 373, 374, 442, 443, 444, 445, 512, 513, 514, 515,
            174, 175, 244, 245, 246, 314, 315, 316, 384, 385, 386, 
            1149, 1150, 1219, 1220, 1289, 1290, 1291, 1359, 1360, 1361,
            1447, 1448, 1517, 1518, 1519, 1587, 1588, 1589, 1657, 1658, 1659,
            1325, 1326, 1395, 1396, 1397, 1465, 1466, 1467, 1535, 1536, 1537,
            1933, 1934, 2003, 2004, 2005, 2073, 2074, 2075, 2143, 2144, 2145, 2213, 2214, 2215,
            2440, 2441, 2510,  2511, 2512, 2580, 2581, 2582, 2650, 2651, 2652 
            ]
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
        if(SantaIndex < squares.length/2){
            window.scrollBy({
                top: -400,
                behavior: 'smooth'
            })
            
        }
        if(SantaIndex < width*2){
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
    if(SantaIndex%width === width-2){
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
    if(SantaIndex > squares.length/2){
        window.scrollBy({
            top: 400,
            behavior: 'smooth'
        })
    }
    if(SantaIndex > squares.length-width*2){
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
    if(SantaIndex%width === 1){
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

let snowballIdx;
reload.addEventListener('click', () => {
    location.reload(true);
})
function moveSnowball(snowballIdx) {
    snowballIdx =  SantaIndex
    if(santaPos == 'santa'){
        function moveSnow() {
            squares[snowballIdx].classList.remove('snowball')
            snowballIdx += 1
            if(snowballIdx%width === width-1){
                clearInterval(snowballInterval)
            }
            if(squares[snowballIdx].classList.contains('tree')){
                clearInterval(snowballInterval)
            }
            squares[snowballIdx].classList.add('snowball')
        }
        let snowballInterval =setInterval(() => {
            moveSnow()

        }, 60);
        setTimeout(() => {
            clearInterval(snowballInterval)
            squares[snowballIdx].classList.remove('snowball')

        }, 600);
    } else if(santaPos == 'santaTop'){
        snowballIdx -= width;
        function moveSnow() {
            squares[snowballIdx].classList.remove('snowball')
            snowballIdx -= width;
            if(squares[snowballIdx].classList.contains('tree')){
                clearInterval(snowballInterval)
            }
            squares[snowballIdx].classList.add('snowball')
        }
        let snowballInterval =setInterval(() => {
            moveSnow()
            
        }, 60);
        setTimeout(() => {
            clearInterval(snowballInterval)
            squares[snowballIdx].classList.remove('snowball')
        }, 600);
        
        squares[snowballIdx].classList.add('snowball')
    } else if(santaPos == 'santaBack'){
        function moveSnow() {
            squares[snowballIdx].classList.remove('snowball')
            snowballIdx -= 1;
            if(snowballIdx%width === 0){
                clearInterval(snowballInterval)
            }
            if(squares[snowballIdx].classList.contains('tree')){
                clearInterval(snowballInterval)
            }
            squares[snowballIdx].classList.add('snowball')
        }
        let snowballInterval =setInterval(() => {
            moveSnow()
            
        }, 60);
        setTimeout(() => {
            clearInterval(snowballInterval)
            squares[snowballIdx].classList.remove('snowball')
        }, 600);
        snowballIdx -= 1
        squares[snowballIdx].classList.add('snowball')
    } else if(santaPos == 'santaDown'){
        snowballIdx += width
        function moveSnow() {
            squares[snowballIdx].classList.remove('snowball')
            if(squares[snowballIdx].classList.contains('tree')){
                clearInterval(snowballInterval)
            }
            snowballIdx += width
            squares[snowballIdx].classList.add('snowball')
        }
        let snowballInterval =setInterval(() => {
            moveSnow()
            
        }, 60);
        setTimeout(() => {
            clearInterval(snowballInterval)
            squares[snowballIdx].classList.remove('snowball')
        }, 600);
        squares[snowballIdx].classList.add('snowball')
    }
    
}
function throwSnowBall(e){
    if(e.key === 't'){
        moveSnowball(snowballIdx);
    }  
}
document.addEventListener('keydown', throwSnowBall)
throwSnow.addEventListener('click',  () => {
    
    moveSnowball(snowballIdx)  
})
let computerIdx = 670;
squares[computerIdx].classList.add('computer')

const computerDirectionObj = {
    1: 'forward',
    2: 'back',
    3: 'up',
    4: 'down',
    5: 'forward',
    6: 'back',
    7: 'up',
    8: 'down',
    9: 'forward',
    10: 'back',
    11: 'up',
    12: 'down',
    13: 'forward',
    14: 'back',
    15: 'up',
    16: 'down'
}

function removeComputerSanta() {
    squares[computerIdx].classList.remove('computer')
    squares[computerIdx].classList.remove('computerBack')
    squares[computerIdx].classList.remove('computerTop')
    squares[computerIdx].classList.remove('computerDown')
}
function moveComputerSanta() {
    let computerDirection = Math.floor(Math.random()*16+1)

    if(computerDirectionObj[computerDirection] === 'forward'){
        let forwardInterval = setInterval(() => {
            removeComputerSanta()
            computerIdx += 1
            if(squares[computerIdx].classList.contains('tree')){
                computerIdx -= 1;
            }
            if(squares[computerIdx].classList.contains('santa') || squares[computerIdx].classList.contains('santaTop') || squares[computerIdx].classList.contains('santaBack') || squares[computerIdx].classList.contains('santaDown')){
                computerIdx -= 1;
            }
            if(computerIdx%width === width-2){
                computerIdx -= 1;
            }
            squares[computerIdx].classList.add('computer')
            setTimeout(() => {
                clearInterval(forwardInterval)
            }, 400);
        }, 100);
        
        

    } else if(computerDirectionObj[computerDirection] === 'back'){
        let backInterval = setInterval(() => {
            removeComputerSanta()
            
            computerIdx -= 1
            if(squares[computerIdx].classList.contains('tree')){
                computerIdx += 1;
            }
            if(squares[computerIdx].classList.contains('santa') || squares[computerIdx].classList.contains('santaTop') || squares[computerIdx].classList.contains('santaBack') || squares[computerIdx].classList.contains('santaDown')){
                computerIdx += 1;
            }
            if(computerIdx%width === width+1 || computerIdx%width === 0){
                computerIdx += 1;
            }
            squares[computerIdx].classList.add('computerBack')
            setTimeout(() => {
                clearInterval(backInterval)
            }, 400);
        }, 100);

    } else if(computerDirectionObj[computerDirection] === 'up'){
        let TopInterval = setInterval(() => {
            removeComputerSanta()
            
            computerIdx -= width
            if(squares[computerIdx].classList.contains('tree')){
                computerIdx += width;
            }
            if(squares[computerIdx].classList.contains('santa') || squares[computerIdx].classList.contains('santaTop') || squares[computerIdx].classList.contains('santaBack') || squares[computerIdx].classList.contains('santaDown')){
                computerIdx += width;
            }
            if(computerIdx< width*2){
                computerIdx += width;
            }
            squares[computerIdx].classList.add('computerTop')
            setTimeout(() => {
                clearInterval(TopInterval)
            }, 400);
        }, 100);
        
        

    } else if(computerDirectionObj[computerDirection] === 'down'){
        let downInterval = setInterval(() => {
            removeComputerSanta()

            computerIdx += width
            if(squares[computerIdx].classList.contains('tree')){
                computerIdx -= width;
            }
            if(squares[computerIdx].classList.contains('santa') || squares[computerIdx].classList.contains('santaTop') || squares[computerIdx].classList.contains('santaBack') || squares[computerIdx].classList.contains('santaDown')){
                computerIdx -= width;
            }
            if(computerIdx>squares.length-width*2){
                computerIdx -= width;
            }
            squares[computerIdx].classList.add('computerDown')
            setTimeout(() => {
                clearInterval(downInterval)
            }, 400);
        }, 100);
    }
    if(squares[computerIdx].classList.contains('snowball') || squares[computerIdx+1].classList.contains('snowball') || squares[computerIdx-1].classList.contains('snowball') || squares[computerIdx+width].classList.contains('snowball') || squares[computerIdx-width].classList.contains('snowball')){
        clearInterval(moveComputerInterval)
        res.classList.add('showRes')
        removeComputerSanta()
        return
    }

}
let moveComputerInterval = setInterval(() => {
    moveComputerSanta()
}, 400);  
