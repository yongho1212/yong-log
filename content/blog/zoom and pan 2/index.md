---
title: JS 줌 앤 팬(Zoom and Pan) 구현하기(2)
date: "2024-04-29T22:12:03.284Z"
description: "바닐라 자바스크립트로 줌 앤 팬 기능 구현해보기"
---
</br>

지난 포스트에 이어 나머지 기능도 구현해보자.
</br>
이번엔 드래그와 드래그 시 경계를 벗어나지 않도록하는 bounding 기능을 구현해보겠다.
</br>

드래그 기능자체는 일반 Drag 기능과 크게 다르지 않았다.
</br>
</br>

우선 드래그 시작시 마우스 좌표와 target의 좌표를 저장할 변수를 생성하고 
</br>
`mousedown`, `mousemove`, `mouseup` 각 이벤트에 대해 로직을 추가해준다. 

```js
//mouse
let startX, startY;
//target
let initialX = 0, initialY = 0;
let scale = 1; 
let tempX, tempY;
```


```js
    viewer.addEventListener('mousedown', function (e) {
        e.preventDefault();
        startX = e.clientX;
        startY = e.clientY;
        isDragging = true;
    });
```

현재 마우스 위치에서 초기 마우스 위치를 빼서 이동한 거리 `moveX`, `moveY`를 계산한다.
</br>

이 값을 초기 위치에 더해 `target`이 이동할 새 위치`newPosX`, `newPosY`를 계산하고, 이를 `transform` 스타일을 통해 적용한다.


```js
viewer.addEventListener('mousemove', function (e) {
    if (isDragging) {
        let moveX = e.clientX - startX;
        let moveY = e.clientY - startY;

        let newPosX = moveX + initialX
        let newPosY = moveY + initialY

        target.style.transform = `translateX(${newPosX}px) translateY(${newPosY}px) scale(${scale})`
        tempX = newPosX
        tempY = newPosY
    }
});
```
`newPosX`, `newPosY` 는 mousemove가 실행되는 동안은 `tempX`, `tempY`에 저장된다.
</br>

이후 mouseup 이벤트가 발생하면 `tempX`, `tempY`에 있는 값들을 `initialX`, `initialY`에 저장한다. 
</br>



```js
document.addEventListener('mouseup', function () {
    if (isDragging) {
        initialX = tempX;
        initialY = tempY;
        isDragging = false;
        target.style.cursor = 'grab';
    }
});
```

그럼 요렇게 드래그는 잘 동작한다!
</br>
근데 `target`의 모서리가가 `viewer`의 모서리 안쪽까지 드래그 되는것을 볼 수 있다.

<img src="https://portfolio-yong.s3.ap-northeast-2.amazonaws.com/blog/zoom+and+pan/bound.gif" width="1000" height="400"/>
</br>

그럼 이제 bounding을 적용해보자.
</br>

우선 `updateLimits` 라는 함수를 만든다.
</br>
함수가 실행되면 `viewer`의 모서리에서 `target`의 모서리까지 상하좌우로 움직일 수 있는 거리를 계산하고 객체로 변수에 그 값을 저장할것이다. 

```js
let dragLimits = {};

function updateLimits() {
    const vRect = viewer.getBoundingClientRect();
    const tRect = target.getBoundingClientRect();

    dragLimits = {
        minX: vRect.right - tRect.right,
        maxX: vRect.left - tRect.left,
        minY: vRect.bottom - tRect.bottom,
        maxY: vRect.top - tRect.top
    };
}
```

`mousedown` 이벤트가 발생하면 `updatelimits`함수를 실행시키고 매번 움직일 수 있는 거리를 계산한다. 

그리고 `mousemove` 이벤트가 발생할 때 `Math.max`, `Math.min`을 활용해서 마우스 이동거리가 각 방향의 limit을 넘지 않도록 설정한다.

```js
// mousemove
let moveX = e.clientX - startX;
let moveY = e.clientY - startY;

moveX = Math.max(dragLimits.minX, Math.min(dragLimits.maxX, moveX));
moveY = Math.max(dragLimits.minY, Math.min(dragLimits.maxY, moveY));

let newPosX = moveX + initialX
let newPosY = moveY + initialY
```

</br>
끝!