import css from './Button.module.css'

export const Button = ({onLoadMore}) => <button className={css.Button} type='button' onClick={onLoadMore}>Load more</button>