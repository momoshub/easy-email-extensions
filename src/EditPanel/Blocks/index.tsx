import { Collapse, Grid, Space, Typography } from '@arco-design/web-react';
import { AdvancedType, BlockManager, IBlockData } from 'easy-email-core';
import { BlockAvatarWrapper, IconFont } from 'easy-email-editor';
import React, { useMemo, useState } from 'react';
import { IconCaretRight, IconCaretUp } from '@arco-design/web-react/icon';
import { getIconNameByBlockType } from '@extensions/utils/getIconNameByBlockType';
import styles from './index.module.scss';
import { useExtensionProps } from '@extensions/components/Providers/ExtensionProvider';

export function Blocks() {
  const { categories, extensionActiveKey } = useExtensionProps();

  const defaultActiveKey = useMemo(
    () => [...categories.filter(item => item.active).map(item => item.label)],
    [categories],
  );

  return (
    <Collapse
      defaultActiveKey={defaultActiveKey}
      {...(extensionActiveKey ? { activeKey: extensionActiveKey } : {})}
      style={{ paddingBottom: 30, minHeight: '100%' }}
    >
      {categories.map((cat, index) => {
        if (cat.displayType === 'column') {
          return (
            <Collapse.Item
              key={index}
              contentStyle={{ padding: '0px 20px' }}
              name={cat.label}
              header={cat.label}
            >
              <Space direction='vertical'>
                <div />
              </Space>
              {cat.blocks.map(item => (
                <LayoutItem
                  key={item.title}
                  title={item.title || ''}
                  columns={item.payload}
                />
              ))}

              <Space direction='vertical'>
                <div />
              </Space>
            </Collapse.Item>
          );
        }

        if (cat.displayType === 'custom') {
          return (
            <Collapse.Item
              key={index}
              contentStyle={{ padding: 0, paddingBottom: 0, paddingTop: 20 }}
              name={cat.label}
              header={cat.label}
            >
              <Grid.Row>
                {cat.blocks.map((item, index) => {
                  return <React.Fragment key={index}>{item}</React.Fragment>;
                })}
              </Grid.Row>
            </Collapse.Item>
          );
        }
        return (
          <Collapse.Item
            key={index}
            contentStyle={{ padding: 0, paddingBottom: 0, paddingTop: 20 }}
            name={cat.label}
            header={cat.label}
          >
            <Grid.Row>
              {cat.blocks.map((item, index) => {
                return (
                  <BlockItem
                    key={index}
                    {...(item as any)}
                    onClick={() => item?.onClick?.(item)}
                  />
                );
              })}
            </Grid.Row>
          </Collapse.Item>
        );
      })}
    </Collapse>
  );
}

function BlockItem({
  type,
  payload,
  title,
  filterType,
  onClick,
}: {
  type: string;
  payload?: Partial<IBlockData>;
  title?: string;
  filterType: string | undefined;
  onClick?: () => void;
}) {
  const block = BlockManager.getBlockByType(type);

  return (
    <div
      className={styles.blockItem}
      onClick={onClick}
    >
      <BlockAvatarWrapper
        type={type}
        payload={payload}
      >
        <div className={styles.blockItemContainer}>
          <IconFont
            style={{ fontSize: 20 }}
            iconName={getIconNameByBlockType(type)}
          />
          <Typography.Text style={{ marginTop: 10 }}>
            {title || block?.name}
          </Typography.Text>
        </div>
      </BlockAvatarWrapper>
    </div>
  );
}

function LayoutItem({ columns, title }: { columns: string[][]; title: string }) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <p
        onClick={() => setVisible(v => !v)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        <span>{title}</span>
        {columns.length > 1 && (
          <span>{!visible ? <IconCaretRight /> : <IconCaretUp />}</span>
        )}
      </p>
      {columns.map((item, index) => {
        const hide = !visible && index !== 0;
        const payload = {
          type: AdvancedType.SECTION,
          attributes: {},
          children: item.map(col => ({
            type: AdvancedType.COLUMN,
            attributes: {
              width: col,
            },
            data: {
              value: {},
            },
            children: [],
          })),
        };

        return (
          <div
            key={index}
            style={{
              height: hide ? 0 : undefined,
              overflow: 'hidden',
              marginBottom: hide ? 0 : 20,
            }}
          >
            <BlockAvatarWrapper
              type={AdvancedType.SECTION}
              payload={payload}
            >
              <div
                style={{
                  border: '1px solid rgb(229, 229, 229)',
                  width: '100%',
                  height: 62,
                  padding: 5,
                }}
              >
                <div
                  style={{
                    height: 52,
                    border: '1px solid rgb(85, 85, 85)',
                    borderRadius: 3,
                    display: 'flex',
                  }}
                >
                  {item.map((column, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          borderRight:
                            index === item.length - 1
                              ? undefined
                              : '1px solid rgb(85, 85, 85)',
                          height: 50,
                          width: column,
                          textAlign: 'center',
                          padding: 5,
                        }}
                      >
                        <img
                          height={40}
                          width={40}
                          src='https://easy-email-m-ryan.vercel.app/images/06ca521d-9728-4de6-a709-1b75a828bfc3-2a9b1224-3d71-43b8-b52f-e7cdcdc9107b.png'
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </BlockAvatarWrapper>
          </div>
        );
      })}
    </div>
  );
}
