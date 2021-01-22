import React, { useState } from 'react';
import { Col, Input, Row } from 'antd';
import StringUtils from '../../src/utils/StringUtils';

const Demo = () => {
  const [version1, setVersion1] = useState('0.2.1');
  const [version2, setVersion2] = useState('0.2.1');
  return (
    <>
      <div>
        当前版本号：{version1},版本号2：{version2}
      </div>
      <div>是否需要更新：{StringUtils.compareVer(version1, version2)}</div>
      <Row>
        <Col>
          版本1：
          <Input onChange={(e) => setVersion1(e.target.value)} />
        </Col>
        <Col>
          版本2：
          <Input onChange={(e) => setVersion2(e.target.value)} />
        </Col>
      </Row>
    </>
  );
};

export default Demo;
