import { Layout, Tabs } from '@arco-design/web-react';
import { useEditorProps } from 'easy-email-editor';
import React, { ReactNode } from 'react';
import { Blocks } from './Blocks';
import { BlockLayer } from '@extensions/BlockLayer';
import { FullHeightOverlayScrollbars } from '@extensions/components/FullHeightOverlayScrollbars';
import styles from './index.module.scss';
import { ConfigurationDrawer } from './ConfigurationDrawer';
import { useExtensionProps } from '@extensions/components/Providers/ExtensionProvider';

const TabPane = Tabs.TabPane;

export type ExtraTab = {
  title: string;
  content: ReactNode;
  key?: string;
};

export function EditPanel({
  showSourceCode,
  extraTabs,
}: {
  showSourceCode: boolean;
  extraTabs?: ExtraTab[];
}) {
  const { height } = useEditorProps();
  const { compact = true } = useExtensionProps();

  return (
    <Layout.Sider
      className={styles.blocksPanel}
      style={{ paddingRight: 0, minWidth: 360 }}
      // collapsed={collapsed}
      collapsible
      trigger={null}
      breakpoint='xl'
      collapsedWidth={60}
      width={360}
    >
      <Tabs
        defaultActiveTab='2'
        style={{ width: '100%', padding: 0 }}
        renderTabHeader={(_, DefaultHeader) => (
          <div className={styles.largeTabsHeader}>
            <DefaultHeader />
          </div>
        )}
      >
        <TabPane
          key='2'
          title={t('Block')}
        >
          <FullHeightOverlayScrollbars height={`calc(${height} - 60px)`}>
            <Blocks />
          </FullHeightOverlayScrollbars>
        </TabPane>

        <TabPane
          key='1'
          title={t('Layer')}
        >
          <FullHeightOverlayScrollbars height={`calc(${height} - 60px)`}>
            <div style={{ padding: 20 }}>
              <BlockLayer />
            </div>
          </FullHeightOverlayScrollbars>
        </TabPane>
        {extraTabs?.map(tab => {
          return (
            <TabPane
              key={tab.key || tab.title}
              title={tab.title}
            >
              <FullHeightOverlayScrollbars height={`calc(${height} - 60px)`}>
                <div style={{ padding: 20 }}>{tab.content}</div>
              </FullHeightOverlayScrollbars>
            </TabPane>
          );
        })}
      </Tabs>
      {!compact && (
        <ConfigurationDrawer
          height={height}
          showSourceCode={showSourceCode}
          compact={Boolean(compact)}
        />
      )}
    </Layout.Sider>
  );
}
