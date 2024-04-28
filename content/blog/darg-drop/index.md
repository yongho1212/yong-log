---
title: JS 드래그 앤 드롭(Drag and Drop) 구현하기
date: "2024-04-20T22:12:03.284Z"
description: "바닐라 자바스크립트로 드래그 앤 드롭 기능 구현해보기"
---

지난 프로젝트에서 pdf viewer 내부에서 pan and zoom 기능을 구현했다.
먼저 이번 포스트를 통해 JS로 드래그 앤 드롭을 구현할 예정이다.

![Drag](https://portfolio-yong.s3.ap-northeast-2.amazonaws.com/blog/drag/drag.gif)
<br/>



```js
let startX, startY;
let initialX, initialY; 
```
먼저 마우스 이동거리 계산을 위해 mouseDown 좌표를 저장할 변수(`startX`, `startY`)와 드래그 하고자 하는 요소 (이하 draggable)의 초기 위치를 저장하기 위한 변수(`initialX`, `initialY`)를 생성한다.
<br/>
<br/>
```js
draggable.addEventListener('mousedown', function(e) {
    startX = e.clientX;
    startY = e.clientY;
    initialX = draggable.offsetLeft; // 요소의 현재 left 값을 저장
    initialY = draggable.offsetTop;  // 요소의 현재 top 값을 저장
    isDragging = true;
    draggable.style.cursor = 'grabbing';
});
```
이후 draggable 요소에 `mousedown` eventListener를 추가해준다. <br/>
`e.clientX`, `e.clientY`를 통해 mouseDown이 발생했을 때 마우스 좌표를 startX,Y값을 startX, startY에 저장하고,<br/>
`offsetLeft`, `offsetTop`을 이용해 요소의 현재 위치를 `initialX` `initialY`에 저장한다. <br/>
</br>
> 이 코드에서는 draggable의 부모가 body이기 때문에 offsetLeft, Top을 사용했다.
> 상황에 따라 다르게 사용해야한다!
<br/>

```js
document.addEventListener('mousemove', function(e) {
    if (isDragging) {
        const moveX = e.clientX - startX + initialX;
        const moveY = e.clientY - startY + initialY;

        draggable.style.left = `${moveX}px`;
        draggable.style.top = `${moveY}px`;
    }
});
```
이번엔 mousemove 이벤트 리스너를 추가한다. 
여기서 `e.clientX`와 `e.clientY`를 사용하여 현재 마우스 위치에서 `mousedown` 시점의 좌표를 빼고, 초기 위치(`initialX`, `initialY`)를 더해 최종적인 요소의 위치를 계산한다.</br>

그리고 드래그 후 드랍한 위치에서 다시 드래그를 하려면 `initialX,Y`를 꼭 더해줘야한다. </br>
`e.clientX` - `startX`, `e.clientY` - `startY`는 0에서부터 증가한다.</br>
drop을 하고 다시 잡아끄는 순간 0이되면서 `draggable.style.left`, `draggable.style.top`값이 0이되면서 초기 렌더되는 위치로 돌아간다.</br>
</br>

> 단순하게 마우스 이동거리만 계산 했다가 원하는 대로 이동하지 않았던 경험이 있다ㅠ

</br>

```js
document.addEventListener('mouseup', function(e) {
    if (isDragging) {
        isDragging = false;
        draggable.style.cursor = 'grab'; // 커서 스타일 복원
    }
});
```
드래그를 종료하기 위해 mouseup 이벤트를 document에 추가한다.</br>
마우스 버튼을 놓을 때, isDragging 플래그를 false로 설정하여 드래그 상태를 해제하고, 커서 스타일을 원래대로 돌려놓는다. </br></br>

코드 & 결과물
<iframe 
    height="400" style="width: 100%;" scrolling="no" title="Untitled" 
    src="https://codepen.io/yongho1212/embed/gOyBjzW?default-tab=html%2Cresult" 
    frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"
    >
    See the Pen 
    <a href="https://codepen.io/yongho1212/pen/gOyBjzW">
        Untitled
    </a> 
    by yongho1212 (<a href="https://codepen.io/yongho1212">@yongho1212</a>)
    on <a href="https://codepen.io">CodePen</a>.
</iframe>