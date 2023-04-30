import React, { FC, useEffect, useState } from 'react';
import { GenerateFormValueType, GenerateClientModalProps } from './models';
import cl from './GenerateClientModal.module.scss';
import { Button, Form, Input, Modal, Select, Switch } from 'antd';
import { GeneratorTypeArr, NamingTypeArr } from '@tools/hooks/api/generator/constants';
import { useApiContext } from '@components/layout';
import { defaultFormValue } from './constants';
import { LoadingOutlined } from '@ant-design/icons';
import { ErrorModal } from '@components/error-modal';

/** TooltipContentGen - TG */
const TG = ({ name, example } : { name: string, example?: { str: string, marked: boolean }[] }) => {
  return (
    <>
      <p>{name}</p>
      {example ? (
        <p>
          {example.map((item, i) => (
            <span
              key={item.str + String(i * Math.random())}
              className={item.marked ? cl.marked : ''}
            >
              {item.str}
            </span>
          ))}
        </p>
      ) : <></>}
    </>
  );
};

const GenerateClientModal: FC<GenerateClientModalProps> = ({ fileName }) => {
  const {
    generateBySpec,
    setGenerateFileName,
    getGeneratedClientList,
    generateConfigBySpec,
    isGeneratingClient: isGenerating,
    isGeneratingConfig
  } = useApiContext();
  const [formInstance] = Form.useForm();

  const [formValue, setFormValue] = useState<GenerateFormValueType>(defaultFormValue);

  const handleChangeForm = (changedValues: Partial<GenerateFormValueType>, values: GenerateFormValueType) => {
    setFormValue(values)
  };

  const handleGenerate = async (values: GenerateFormValueType) => {
    if (!generateBySpec || !fileName) return;
    const result = await generateBySpec(fileName, {
      ...values,
      npmName: values.npmName + "-tsclient-" + formValue.type
    });
    if (typeof result === 'boolean' && result) {
      closeModal();
      getGeneratedClientList && getGeneratedClientList();
    } else {
      ErrorModal('Ошибка генерации', result);
    }
  };

  const handleGenerateConfig = async () => {
    if (!generateConfigBySpec || !fileName) return;
    await generateConfigBySpec(fileName, {
      ...formValue,
      npmName: formValue.npmName + "-tsclient-" + formValue.type
    });
  };

  const closeModal = () => {
    if (!isGenerating && setGenerateFileName) {
      setGenerateFileName(null);
      formInstance.setFieldsValue(defaultFormValue);
      setFormValue(defaultFormValue);
    }
  };

  useEffect(() => {
    if (fileName) {
      setFormValue(defaultFormValue);
      formInstance.setFieldsValue(defaultFormValue);
    }
  }, [fileName]);

  return (
    <Modal className={cl.generateClientModal}
      open={fileName !== null}
      onCancel={closeModal}
      destroyOnClose
      footer={(
        <>
          <Button
            onClick={closeModal}
            disabled={isGenerating || isGeneratingConfig}
          >
            Отмена
          </Button>
          <Button
            onClick={handleGenerateConfig}
            disabled={isGenerating || isGeneratingConfig}
          >
            {isGeneratingConfig && <LoadingOutlined />} Скачать конфигурацию openapi
          </Button>
          <Button
            type="primary"
            onClick={() => formInstance.submit()}
            disabled={isGenerating || isGeneratingConfig}
          >
            {isGenerating && <LoadingOutlined />} Сгенерировать
          </Button>
        </>
      )}
    > 
      <p className={cl.generateClientModal__title}>Настройки генерации для {fileName}</p>
      <div className={cl.generateClientModal__row}>
        <Form
          className={cl.generateClientModal__form}
          form={formInstance}
          name='generateSettings'
          layout='horizontal'
          size='small'
          onFinish={handleGenerate}
          onValuesChange={handleChangeForm}
          lang='ru'
          disabled={isGenerating || isGeneratingConfig}
          labelCol={{
            span: 0,
            offset: 0
          }}
        >
          <Form.Item name="type" label="Тип апи-клиента">
            <Select
              options={GeneratorTypeArr}
            />
          </Form.Item>

          <Form.Item 
            name="apiNameSuffix"
            label="apiNameSuffix"
            tooltip={TG({
              name: 'Суффикс контроллера(раздела) апи',
              example: [
                { str: `class Example`, marked: false },
                { str: `${formValue.apiNameSuffix}`, marked: true },
                { str: ` {...}`, marked: false },
              ]
            })}
          >
            <Input />
          </Form.Item>

          <Form.Item 
            name="modelNamePrefix"
            label="modelNamePrefix"
            tooltip={TG({
              name: 'Приставка к названию модели(интерфейса)',
              example: [
                { str: `interface `, marked: false },
                { str: `${formValue.modelNamePrefix}`, marked: true },
                { str: `ExampleModel {...}`, marked: false },
              ]
            })}
          >
            <Input />
          </Form.Item>

          <Form.Item 
            name="modelNameSuffix"
            label="modelNameSuffix"
            tooltip={TG({
              name: 'Суффикс названия модели(интерфейса)',
              example: [
                { str: `interface ExampleModel`, marked: false },
                { str: `${formValue.modelNameSuffix}`, marked: true },
                { str: ` {...}`, marked: false },
              ]
            })}
          >
            <Input />
          </Form.Item>

          <Form.Item 
            name="npmName" 
            label="npmName"
            tooltip={TG({
              name: `Наименование пакета, #{name} = ${fileName?.split('.json')[0]}`,
              example: [
                { str: formValue.npmName?.split('#{name}')[0] || '', marked: false },
                { str: fileName?.split('.json')[0] || '', marked: true },
                { str: "-tsclient-", marked: false },
                { str: formValue.type, marked: true },
              ]
            })}
          >
            <Input addonAfter={"-tsclient-" + formValue.type} />
          </Form.Item>

          <Form.Item name="paramNaming" label="paramNaming">
            <Select
              options={NamingTypeArr}
            />
          </Form.Item>

          <Form.Item name="modelPropertyNaming" label="modelPropertyNaming">
            <Select
              options={NamingTypeArr}
            />
          </Form.Item>

          <Form.Item name="enumPropertyNaming" label="enumPropertyNaming">
            <Select
              options={NamingTypeArr}
            />
          </Form.Item>

          <Form.Item name="enumNameSuffix" label="enumNameSuffix" tooltip="только 2-я версия спеки">
            <Input />
          </Form.Item>

          <Form.Item name="stringEnums" label="stringEnums" valuePropName='checked'>
            <Switch />
          </Form.Item>

          <Form.Item name="sortParamsByRequiredFlag" label="sortParamsByRequiredFlag" valuePropName='checked'>
            <Switch />
          </Form.Item>

          <Form.Item name="sortModelPropertiesByRequiredFlag" label="sortModelPropertiesByRequiredFlag" valuePropName='checked'>
            <Switch />
          </Form.Item>

          <Form.Item name="withInterfaces" label="withInterfaces" valuePropName='checked'>
            <Switch />
          </Form.Item>
        </Form>
      </div>
      
    </Modal>
  );
};

export { GenerateClientModal };