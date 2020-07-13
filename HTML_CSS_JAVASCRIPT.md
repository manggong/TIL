# HTML, CSS

## I. HTML

웹을 이루는 가장 기본적인 Building Block



### 1. HTML의 구조

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>document</title>
    <!-- Head에는 웹 페이지에 표시되는 메타 정보가 들어간다. -->
  </head>
  <body>
    <h1>
      이곳은 body입니다.
      <!-- 사용자에게 보여지는 Tag들이 들어간다. -->
    </h1>
  </body>
</html>
```



### 2. 박스 모델

- 레이아웃을 박싱하자!!!



### 3. Block vs Inline

- `Block` : 충분한 공간이 있어도 다음라인에 생김 (한줄에 하나 공간 차지)
  - `div`
- `Inline` : 공간이 있으면 옆에 생김
  - `span`



## II. CSS

Cascading Style Sheet 정의된 것 부터 찾고, 없으면 브라우저에서 기본적으로 제공해 주는 것을 사용함

`우선순위` : `Author Style` > `User Style` > `Browser` (! important를 사용하면 최고 우선순위를 가짐)



### 1. Selectors

- Universal : `*`
- Type : `Tag`
- ID : `#id`
- Class : `.class`
- State : `:`
- Attribute : `[]`

```css
selector {
  property: value;
}

*{
  color: green;
}

li {
  color: blue;
}

#special {
  color: pink;
}

.red {
  width: 100px;
  height: 100px;
  background: yellow;
}

button:hover {
  color: red;
  background: beige;
}

a[href="naver.com"] {
  color: purple;
}
```



### 2. Attribute

- `padding` : 컨텐츠 안에 들어가는 공간
- `margin` : 컨텐츠 밖에 들어가는 공간
- `border` : 테두리



### 3. [CSS연습 게임 링크](https://flukeout.github.io)



### 4. Display

- `inline` : 컨텐츠 기준으로 영역을 잡음, 한줄 씩 나옴
- `inline-block` : width, height값 기준으로 영역을 잡으며, 영역이 남으면 한줄에 표시함
- `block` : 한줄에 하나씩 표시함



### 5. Position

- `static` : 기본값, HTML에 정의된 순서대로 보여 줌
- `relative` : 원래 있어야하는 아이템에서 이동 (인접 노드 기준 상대위치)
- `absolute` : 내 아이템이 담겨있는 가장 가까운 박스에서 이동 (부모 노드 기준 절대위치)
- `fixed` : `window` 기준으로 이동 (window 기준 절대위치)
- `sticky` : 원래 있어야하는 곳에 있는데 스크롤링 할 때도 있음 (부모 노드 기준 상대위치에 있지만, 스크롤링 시에도 같은 곳에 있음)



### 6. Flex box

- `display : flex;` flex box 시작
- `flex-direction: row;` (가로 정렬 됨)  (column, column-reverse,row-reverse)
- `flex-wrap: wrap;` 브라우저 크기에 따라서 박스들의 줄이 바뀜 (nowrap)
- `justify-content: space-around;` 박스 간 스페이싱 해 줌 (space-between)
- `align-items: center;` (baseline)  첫 박스 기준으로 텍스트 정렬
- `align-content: center;`
- `order` 를 이용해서 item들의 순서를 바꿀 수 있음
- `flex-grow: 1`;  item들이 빈 공간을 채움
- `flex-shrink: 1` 줄어들 때 사이징
- `flex-basis: auto;` item의 상대적 크기 정할 수 있음
- `align-self: center;` item별로 정렬가능



### 7. [FlexBox Game](https://flexboxfroggy.com/#ko)