# ArrayUtil

> 数组工具

```tsx
import React, {useState} from 'react';
import ReactJson from 'react-json-view'; 
import ArrayUtil from '../../src/utils/ArrayUtil'; 

const data = [{a: 1, b: 2}, {a: 3, b: 3}]

const Demo = () => {
  const [array, setArray] = useState(data);

  const remove = () => {
    const newArray = ArrayUtil.remove(array, {a: 1, b: 2}, 'a');
    setArray(newArray);
  }

  return (
    <>
      <div>默认数据:</div>
      <ReactJson src={array}/>
      <button onClick={remove}>移除指定数据</button>
    </>
  )
}
export default Demo;
```

# StringUtils

<code src="./Demo.tsx" title="版本比较" />
