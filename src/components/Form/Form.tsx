import React, { type FormEventHandler } from 'react'
import styles from './Form.module.sass'

interface FromProps {
  onSubmitForm: FormEventHandler
  onInput: FormEventHandler
  selections: Array<{ value: string, label: string }>
}

function Form ({ onSubmitForm, onInput, selections }: FromProps) {
  const mapFromSelections = () => selections
    .map((el) => <option key={el.value} value={el.value}>{el.value}</option>)
  return (
    <form
      className={styles.form}
      data-testid="Form"
      onSubmit={onSubmitForm}
    >
      <div className={styles.inputBox}>
        <select id="phone-country">
          {mapFromSelections()}
        </select>
        <input
          onInput={onInput}
          className={styles.input}
          type="number"
          pattern="[0-9]{3,10}"
          required
          id="num"
          placeholder="type your phone"
        />
      </div>
    </form>
  )
}
export default React.memo(Form)
