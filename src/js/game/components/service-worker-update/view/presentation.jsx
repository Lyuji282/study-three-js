// @flow

import React from 'react';

/** プロパティ */
type ServiceWorkerUpdateProps = {
  isVisible: boolean
};

/**
 * サービスワーカー更新のReact Component
 *
 * @return サービスワーカー更新
 */
export function ServiceWorkerUpdatePresentation(props: ServiceWorkerUpdateProps) {
  return (
    <div className="service-worker-update" style={{
      display: props.isVisible
        ? 'flex'
        : 'none'
    }}>
      <div className="service-worker-update__title">新バージョンがリリースされました</div>
      <div className='service-worker-update__body'>お手数ですが、ゲームを開いているタブを全て閉じた後に、再度ゲームを開いてください。</div>
    </div>
  );
}