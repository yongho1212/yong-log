---
title: JS 줌 앤 팬(Zoom and Pan) 구현하기
date: "2024-04-26T22:12:03.284Z"
description: "바닐라 자바스크립트로 줌 앤 팬 기능 구현해보기"
---
</br>

지난 프로젝트에서 개발했던 주요 기능중 하나는 웹 메거진을 보는 pdf viewer에 스크롤을 통한 확대 축소 및 드래그를 통한 탐색 기능이었다. 
</br>

당시에는 시간에 쫓겨 라이브러리로 구현했지만 이번 기회에 줌 앤 팬 기능을 바닐라 자바스크립트로 직접 구현해볼것이다. 
</br>


<img src="https://portfolio-yong.s3.ap-northeast-2.amazonaws.com/blog/zoom+and+pan/panzoom.gif" width="1000" height="400"/>

### 구현해야할 기능들 
- -wheel을 통한 scale 변경
- -drag 기능
- -bound 기능

</br>

<img src="https://portfolio-yong.s3.ap-northeast-2.amazonaws.com/blog/zoom+and+pan/target.png" width="1000" height="400"/>
</br>

먼저 wheel을 통한 scale변경을 구현해보자.

```js
viewer.addEventListener('wheel', function (e) {
        e.preventDefault();
        const rect = viewer.getBoundingClientRect();

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const deltaScale = Math.sign(e.deltaY) * -0.05;
        const newScale = Math.max(1, Math.min(3, scale + deltaScale));

        scale = newScale;
        target.style.transformOrigin = `${mouseX}px ${mouseY}px`;
        target.style.transform = `scale(${scale})`;
    });
```

처음에는 단순히 e.clientX, e.clientY로 좌표를 받고 그 좌표를 transformOrigin으로 설정하여 scale을 변경하고자 했다. 
</br>
이렇게 하면 zoom in, zoom out는 잘 동작한다. 

<!-- target의 scale이 늘어난 상태에서 viewer의 overflow hidden안에  -->
문제는 드래그로 target의 위치를 이동시킬 때 transform의 translate을 이용해서 이동시키는데 
scale을 변경하고 첫 드래그 시 target의 위치정보가 없어서 점프하는 현상이 일어났다.

<img src="https://portfolio-yong.s3.ap-northeast-2.amazonaws.com/blog/zoom+and+pan/pan+jump.gif" width="1000" height="400"/>
</br>

그래서 transform-origin을 직접 구현해줬다. 

</br>
<img src="https://portfolio-yong.s3.ap-northeast-2.amazonaws.com/blog/zoom+and+pan/tr1.png" width="1000" height="300"/>
</br>

우선 viewer 중앙 우측 상단에 휠 이벤트를 발생시켜보자. (초록책 점)

</br>
<img src="https://portfolio-yong.s3.ap-northeast-2.amazonaws.com/blog/zoom+and+pan/tr2.png" width="1000" height="300"/>
</br>

transform-origin 속성의 기본 값은 50% 50%이기 때문에 중앙을 기준으로 확대된다.

</br>

우측 상단을 기준으로 확대되는것 처럼 보이게 하려면 target이 좌측 하단 화살표만큼 움직여줘야한다.

</br>
<img src="https://portfolio-yong.s3.ap-northeast-2.amazonaws.com/blog/zoom+and+pan/tr3.png" width="1000" height="300"/>

</br>

### 그럼 어떻게 얼마만큼 움직여야할까?

</br>

현재 scale변경은 viewer의 중앙점을 기준으로 이루어진다. 즉 중앙이 겹쳐있는 상태에서 x축을 기준으로 오른쪽으로 움직이면 +, 왼쪽으로 움직이면 -, y축은 아래로 움직이면 +, 위로 움직이면 -가 된다.

</br>

이미지 2번에서 3번으로 변하려면 target이 좌하단으로 이동해야한다.
</br>

우선 스크롤 이벤트가 발생환 좌표와 viewer의 중앙좌표 사이의 거리를 구하고 현재 scale - 1한 값을 곱한다.
</br></br>

> 여기서 newScale - 1은 새로운 스케일과 기본 스케일의 차이이다.</br>
> newScale이 1보다 클 때, -1을 하면 확대된 정도만큼만 계산하게 된다.

</br>

또한 다시 scale을 1로 돌려놓을 때 viewer 와 target이 일치하도록 하는 로직을 추가해준다.


</br>

```js
    initialX = -(mouseX - ((rect.right - rect.left) / 2)) * (newScale - 1)
    initialY = -(mouseY - ((rect.bottom - rect.top) / 2)) * (newScale - 1)                

    if (newScale === 1) {
        initialX = 0;
        initialY = 0;
    }

    scale = newScale;
    
    target.style.transform = `translateX(${initialX}px) translateY(${initialY}px) scale(${scale})`;

```


완성!

글이 길어져서 다음편에서 Drag를 구현해보겠다

<br/>