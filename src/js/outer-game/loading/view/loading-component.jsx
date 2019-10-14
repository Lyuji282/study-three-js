// @flow

import React from 'react';
import {resourceBasePath} from "../../../resource/resource-base-path";

/** プロパティ */
export type Props = {
  isVisible: boolean,
  completedRate: number
};

/**
 * ローディングのReact Component
 *
 * @param props プロパティ
 * @return 生成結果
 */
export function LoadingComponent(props: Props) {
  return (
    <div className="loading" style={{
      display: props.isVisible
        ? 'flex'
        : 'none'
    }}>
      <div className="loading__completed-rate">
        <div className="loading__completed-rate__text">
          {`LOADING... ${Math.floor(props.completedRate * 100)}%`}
        </div>
        <div className="loading__completed-rate__bar">
          <div className="loading__completed-rate__bar__completed" style={{
            width: `${props.completedRate * 100}%`
          }}></div>
        </div>
      </div>
    </div>
  );
}