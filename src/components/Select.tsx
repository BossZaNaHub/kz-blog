"use client"

import { useEffect, useState, useRef } from "react"
import { LuX, LuChevronDown } from 'react-icons/lu'

interface SelectOption {
    placeholder: string
    tag?: boolean
    multiple?: boolean
    options?: SelectOptionValue[]
    styles?: StylesConfig
    values?: (opts: SelectOptionValue[]) => void
    caseSensitive: boolean
}

export interface SelectOptionData {
    key: string
    value: string
    rgb: null
}

export interface SelectOptionDataWithStyle {
    key: string
    value: string
    rgb: string[]
}

export type SelectOptionValue = SelectOptionData | SelectOptionDataWithStyle

interface StylesConfig {
    
}

const Select = ({placeholder, tag, options=[], styles, caseSensitive, values}: SelectOption) => {
    const [isSelect, setIsSelect] = useState<SelectOptionValue[]>([])
    const [search, setSearch] = useState<string>('')
    const [show, setShow] = useState<boolean>(false)
    const [optionData, setOptionData] = useState<SelectOptionValue[]>([])

    const IInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setOptionData(options)

        window.addEventListener('click', handleWindowKeyDown)
        return () => {
            window.removeEventListener('click', handleWindowKeyDown);
        };
    }, [options])

    const onSelectChanged = () => {
        setShow(!show)
        
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key == "Escape") {
            IInputRef.current?.blur()
            setShow(false)
        }
    }

    const handleWindowKeyDown = () => {
        // console.log('detect')
        // console.log(IInputRef.current)
        if (IInputRef.current && !IInputRef.current.contains(event?.target)) {
            setShow(false)
        }
    }

    const onSelectedValue = (data: SelectOptionData | SelectOptionDataWithStyle) => {
        console.log('onSelectedValue: ', data)
        if (tag) {
            setIsSelect(
                (prevSelect) => {
                    let item = prevSelect.find(v => v.key === data.key)
                    if (!item) {
                        values!([...prevSelect, data])
                        return [...prevSelect, data]
                    } else {
                        values!([...prevSelect])
                        return [...prevSelect]
                    }
                })
        } else {
            values!([data])
            setIsSelect([data])
        }
        
        setShow(!show)
        setSearch('')
    }

    const onSearchOption = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setSearch(value)
        setOptionData(options?.filter((v: SelectOptionValue) => {
            let searchValue = caseSensitive ? v.value : v.value.toLowerCase()
            return searchValue.includes(caseSensitive ? search : search.toLowerCase())
        }))
    }

    const removeTagItem = (data: SelectOptionData | SelectOptionDataWithStyle) => {
        const items = isSelect.filter(item => item.key !== data.key)
        values!(items)
        setIsSelect(items)
    }

    const _renderOptionData = (data: SelectOptionValue[]) => {
        console.log('render: ', data)
        if (data.length > 0) {
            return (
            data.map((v: SelectOptionValue, i: number) => {
                return (
                    <div
                        key={i}  
                        className="w-full p-2 block bg-white hover:bg-gray-400 text-white"
                        style={v.rgb? {background: `linear-gradient(
                            to right,
                            transparent,
                            rgba(${v.rgb[0]},1)
                            ) rgba(${v.rgb[1]},1)`} : {}}
                        onClick={() => onSelectedValue(v)}>
                        {v.value}
                    </div>
                )
            })
        )
        } else {
            return (
                <div className="w-full p-2 block bg-white text-gray-400 text-center">
                    No Options
                </div>
            )
        }
    }

    return (
        <div className="w-full max-w-sm">
            <div className="relative z-20" onKeyDown={(e) => handleKeyDown(e)}>
                <input 
                    className={`w-full cursor-default p-1 flex items-center rounded-sm border focus-visible:outline-none  ${show ? 'border-black' : 'border-gray-400'}`}
                    placeholder={isSelect && isSelect.length > 0 ? '' : placeholder} 
                    onChange={(event) => onSearchOption(event)}
                    onFocus={() => onSelectChanged()}
                    ref={IInputRef}
                    value={search}
                /> 
                <div className="absolute top-0 bottom-0 right-3.5 z-0 flex">
                    <div className="h-6 my-auto bg-gray-300 w-px"></div>
                    <LuChevronDown className={`relative left-1 my-auto  ${show ? 'text-black' : 'text-gray-400'}`} />
                </div>
                <div className="absolute top-0 bottom-0 flex">
                {isSelect?.map((v: SelectOptionValue, i: number) => {
                    if (tag) {
                        return (
                            <div 
                                className={`relative flex border border-gray-200 bg-gray-200 first:ml-2 m-0.5 my-1 px-1.5 items-center text-sm text-white rounded-sm`} 
                                key={i}
                                style={v.rgb ? {background: `linear-gradient(
                                    to right,
                                    transparent,
                                    rgba(${v.rgb[0]},1)
                                  ) rgba(${v.rgb[1]},1)`} : {}}
                            >
                                <span className="text-white">{v.value}</span>
                                <LuX className="text-white text-xs hover:text-gray-400 ml-1.5" style={v.rgb ? {color: `rgb(${v.rgb})`} : {}} onClick={() => removeTagItem(v)} />
                            </div>
                        )
                    } else {
                        return <div className="flex items-center ml-2 " key={i}>{v.value}</div>
                    }
                })}
                </div>
            </div>
            {show ? 
                <div className="w-full animate-fade-in">
                    {_renderOptionData(optionData)}
                </div> : <></>
            }
        </div>
    )
}

export default Select