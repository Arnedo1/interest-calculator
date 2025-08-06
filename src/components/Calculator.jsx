import React, { useState } from 'react'
import { FaDollarSign } from "react-icons/fa";
import { FaBrazilianRealSign } from "react-icons/fa6";
import { FaEuroSign } from "react-icons/fa";
import { FaPoundSign } from "react-icons/fa";
import { FaYenSign } from "react-icons/fa";
import { MdOutlineCalculate } from "react-icons/md";
import { PiShareNetworkLight } from "react-icons/pi";



const Calculator = () => {
    const [ currency, setCurrency ] = useState( 'USD' )
    const [ contributions, setContributions ] = useState( 'deposits' )
    const [ beginningEnd, setBeginningEnd ] = useState( '' )
    const [ initialInvestment, setInitialInvestment ] = useState( '' )
    const [ interestRate, setInterestRate ] = useState( '' )
    const [ interestPeriod, setInterestPeriod ] = useState( 'annually' )
    const [ compoundFrequency, setCompoundFrequency ] = useState( 'yearly' )
    const [ years, setYears ] = useState( '' )
    const [ months, setMonths ] = useState( '' )
    const [ depositAmount, setDepositAmount ] = useState( '' )
    const [ depositFrequency, setDepositFrequency ] = useState( 'monthly' )
    const [ annualDepositIncrease, setAnnualDepositIncrease ] = useState( '' )
    const [ total, setTotal ] = useState( '' )


    const calculateTotal = () => {
        const principal = parseFloat(initialInvestment) || 0;
        const rate = parseFloat(interestRate) / 100 || 0;
        const yearsNum = parseFloat(years) || 0;
        const monthsNum = parseFloat(months) || 0;
        const totalYears = yearsNum + monthsNum / 12;
        const contribution = parseFloat(depositAmount) || 0;
        const annualIncrease = parseFloat(annualDepositIncrease) / 100 || 0;
    
        // Handle compound frequency
        let compoundsPerYear = 1;
        if (compoundFrequency === 'Monthly') {
            compoundsPerYear = 12;
        }
    
        // Handle deposit frequency
        let depositsPerYear = 1;
        switch (depositFrequency) {
            case 'monthly':
                depositsPerYear = 12;
                break;
            case 'weekly':
                depositsPerYear = 52;
                break;
            case 'daily':
                depositsPerYear = 365;
                break;
        }
    
        // Convert annual rate to periodic rate
        const periodicRate = rate / compoundsPerYear;
    
        let balance = principal;
        const totalPeriods = totalYears * compoundsPerYear;
    
        if (contributions === 'none' || contributions === '') {
            // Simple compound interest
            balance = principal * Math.pow(1 + periodicRate, totalPeriods);
        } else {
            // Calculate contributions per period
            const contributionPerPeriod = contribution / depositsPerYear;
    
            for (let period = 0; period < totalPeriods; period++) {
                // Apply interest for this period
                balance = balance * (1 + periodicRate);
    
                // Apply contributions
                if (contributions === 'deposits') {
                    let adjustedContribution = contributionPerPeriod;
                    // Apply annual deposit increase
                    if (annualIncrease > 0) {
                        const currentYear = Math.floor(period / compoundsPerYear);
                        adjustedContribution *= Math.pow(1 + annualIncrease, currentYear);
                    }
                    balance += beginningEnd === 'beginning' 
                        ? adjustedContribution * (1 + periodicRate)
                        : adjustedContribution;
                }
                if (contributions === 'withdraws') {
                    let adjustedWithdrawal = contributionPerPeriod;
                    if (annualIncrease > 0) {
                        const currentYear = Math.floor(period / compoundsPerYear);
                        adjustedWithdrawal *= Math.pow(1 + annualIncrease, currentYear);
                    }
                    balance -= beginningEnd === 'beginning' 
                        ? adjustedWithdrawal * (1 + periodicRate)
                        : adjustedWithdrawal;
                }
            }
        }
    
        setTotal(balance.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }));
    };
    const getCurrencySign = () => {
        switch ( currency ) {
            case 'USD':
                return <FaDollarSign />
            case 'EUR':
                return <FaEuroSign />
            case 'BRL':
                return <FaBrazilianRealSign />
            case 'GBP':
                return <FaPoundSign />
            case 'JPY':
                return <FaYenSign />
            default:
                return null
        }
    }

    return (
        <div>
            <div className='h-[410px] px-6 py-4 w-[350px] bg-gray-900 border-[0.5px] border-gray-400 rounded-t-xl'>
                <div>
                    <p className='text-gray-200 text-sm mb-1'>Currency:</p>
                    <div className='flex text-white mb-3'>
                        <div onClick={ () => setCurrency( 'USD' ) } className={ `px-4 h-10 flex items-center border-[1px] border-gray-400 rounded-l-lg cursor-pointer ${ currency === 'USD' ? 'bg-orange-500' : 'hover:bg-gray-700' }` }>
                            <FaDollarSign />
                        </div>
                        <div onClick={ () => setCurrency( 'EUR' ) } className={ `px-4 h-10 flex items-center border-[1px] border-gray-400 border-l-0 cursor-pointer ${ currency === 'EUR' ? 'bg-orange-500' : 'hover:bg-gray-700' }` }>
                            <FaEuroSign />
                        </div>
                        <div onClick={ () => setCurrency( 'BRL' ) } className={ `px-4 h-10 flex items-center border-[1px] border-gray-400 border-l-0 cursor-pointer ${ currency === 'BRL' ? 'bg-orange-500' : 'hover:bg-gray-700' }` }>
                            <FaBrazilianRealSign />
                        </div>
                        <div onClick={ () => setCurrency( 'GBP' ) } className={ `px-4 h-10 flex items-center border-[1px] border-gray-400 border-l-0 cursor-pointer ${ currency === 'GBP' ? 'bg-orange-500' : 'hover:bg-gray-700' }` }>
                            <FaPoundSign />
                        </div>
                        <div onClick={ () => setCurrency( 'JPY' ) } className={ `px-4 h-10 flex items-center border-[1px] border-gray-400 border-l-0 cursor-pointer ${ currency === 'JPY' ? 'bg-orange-500' : 'hover:bg-gray-700' }` }>
                            <FaYenSign />
                        </div>
                        <div onClick={ () => setCurrency( '' ) } className={ `px-6 h-10 border-[1px] border-gray-400 border-l-0 rounded-r-lg cursor-pointer ${ currency === '' ? 'bg-orange-500' : 'hover:bg-gray-700' }` }>

                        </div>
                    </div>
                    <div className='text-gray-200 mb-3'>
                        <p className='text-sm'>Initial investment:</p>
                        <div className='flex mt-1'>
                            <div className='w-10 justify-center h-10 bg-neutral-600 border-[1px] border-gray-400 rounded-l-lg flex items-center'>{ getCurrencySign() }</div>
                            <input
                                value={ initialInvestment }
                                onChange={ ( e ) => setInitialInvestment( e.target.value ) }
                                className='h-10 bg-neutral-800 pl-3 border-[1px] border-gray-400 border-l-0 rounded-r-lg outline-none hover:bg-gray-700 cursor-pointer text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                type="number"
                            />
                        </div>
                    </div>
                    <div className='text-gray-200 mb-3'>
                        <p className='text-sm'>Interest rate:</p>
                        <div className='flex gap-3 mt-1'>
                            <div className='relative'>
                                <input
                                    value={ interestRate }
                                    onChange={ ( e ) => setInterestRate( e.target.value ) }
                                    className='w-25 pl-3 pr-6 h-10 bg-neutral-800 border-[1px] border-gray-400 rounded-lg outline-none hover:bg-gray-700 cursor-pointer [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' type="number" />
                                <span className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none'>
                                    %
                                </span>
                            </div>
                            <select
                                value={ interestPeriod }
                                onChange={ ( e ) => setInterestPeriod( e.target.value ) }
                                className='w-25 pl-3 h-10 bg-neutral-600 border-[1px] outline-0 border-gray-400 rounded-lg text-sm hover:bg-gray-700 cursor-pointer'>
                                <option value="annually">annually</option>
                                <option value="monthly">monthly</option>
                            </select>
                        </div>
                    </div>
                    <div className='text-gray-200 mb-3'>
                        <p className='text-sm'>Compound frequency:</p>
                        <div className='flex mt-1'>
                            <select
                                value={ compoundFrequency }
                                onChange={ ( e ) => setCompoundFrequency( e.target.value ) }
                                className='w-35 pl-3 h-10 bg-neutral-600 border-[1px] outline-0 border-gray-400 rounded-lg text-sm hover:bg-gray-700 cursor-pointer'>
                                <option value="Yearly">Yearly (1/yr)</option>
                                <option value="Monthly">Monthly (12/yr)</option>
                            </select>
                        </div>
                    </div>
                    <div className='text-gray-200 mb-3'>
                        <div className='flex gap-3 mt-1'>
                            <div>
                                <p className='text-sm mb-1'>Years:</p>
                                <input
                                    value={ years }
                                    onChange={ ( e ) => setYears( e.target.value ) }
                                    className='pl-3 h-10 w-20 bg-neutral-800 border-[1px] border-gray-400 rounded-lg outline-none hover:bg-gray-700 cursor-pointer [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' type="number" />
                            </div>
                            <div>
                                <p className='text-sm mb-1'>Months:</p>
                                <input
                                    value={ months }
                                    onChange={ ( e ) => setMonths( e.target.value ) }
                                    className='pl-3 h-10 w-20 bg-neutral-800 border-[1px] border-gray-400 rounded-lg outline-none hover:bg-gray-700 cursor-pointer [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' type="number" />
                            </div>
                            <div className='ml-16 mt-4 text-[50px]'><PiShareNetworkLight />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* middel calculator section */ }
            <div className="px-5 py-3 w-[350px] bg-gray-800 border-[0.5px] border-gray-400 border-t-0 transition-all duration-700 ease-in-out overflow-hidden" style={ { height: contributions === 'none' ? '90px' : '300px' } }>
                <p className='text-gray-200 text-sm mb-1'>Additional contributions:<span className='text-gray-400'>(optional)</span></p>
                <div className='flex text-white text-xs mb-3'>
                    <div onClick={ () => setContributions( 'none' ) } className={ `px-4 h-9 border-[1px] flex items-center bg-gray-900 border-gray-400 rounded-l-lg cursor-pointer ${ contributions === 'none' ? 'bg-orange-500' : 'hover:bg-gray-700' }` }>
                        <p>None</p>
                    </div>
                    <div onClick={ () => setContributions( 'deposits' ) } className={ `px-4 h-9 border-[1px] flex items-center bg-gray-900 border-gray-400 border-l-0 cursor-pointer ${ contributions === 'deposits' ? 'bg-orange-500' : 'hover:bg-gray-700' }` }>
                        <p>Deposits</p>
                    </div>
                    <div onClick={ () => setContributions( 'withdraws' ) } className={ `px-4 h-9 border-[1px] flex items-center bg-gray-900 border-gray-400 border-l-0 rounded-r-lg cursor-pointer ${ contributions === 'withdraws' ? 'bg-orange-500' : 'hover:bg-gray-700' }` }>
                        <p>Withdraws</p>
                    </div>
                </div>
                <div className={ `transition-all duration-700 ease-in-out ${ contributions === 'none' ? 'opacity-0 max-h-0' : 'opacity-100 max-h-96' }` }>
                    <div className='text-gray-200 mb-3 text-'>
                        <p className='text-sm'>Deposit amount:<span className='text-gray-400'>(optional)</span></p>
                        <div className='flex mt-1'>
                            <div className='w-10 justify-center h-9 flex items-center bg-neutral-600 border-[1px] border-gray-400 rounded-l-lg'>{ getCurrencySign() }</div>
                            <input
                                value={ depositAmount }
                                onChange={ ( e ) => setDepositAmount( e.target.value ) }
                                className='pl-3 h-9 outline-none flex items-center border-1 border-gray-400 border-l-0 rounded-r-lg hover:bg-gray-700 cursor-pointer w-25 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' type="number" />
                            <select
                                value={ depositFrequency }
                                onChange={ ( e ) => setDepositFrequency( e.target.value ) }
                                className='w-25 ml-3 pl-3 h-9 bg-neutral-600 border-[1px] outline-0 border-gray-400 rounded-lg text-sm hover:bg-gray-700 cursor-pointer'>
                                <option value="annually">annually</option>
                                <option value="monthly">monthly</option>
                                <option value="weekly">weekly</option>
                                <option value="daily">daily</option>
                            </select>
                        </div>

                    </div>
                    <div className='text-gray-200 mb-3 text-xs'>
                        <p className='text-sm'>Deposits made at what point in period?</p>
                        <div className='flex mt-1'>
                            <div onClick={ () => setBeginningEnd( 'beginning' ) } className={ `w-25 h-9 flex justify-center items-center bg-gray-900 border-[1px] border-gray-400 rounded-l-lg ${ beginningEnd === 'beginning' ? 'bg-orange-500' : 'hover:bg-gray-700' } cursor-pointer` }>Beginning</div>
                            <div onClick={ () => setBeginningEnd( 'end' ) } className={ `w-25 h-9 justify-center flex items-center bg-gray-900 border-[1px] border-gray-400 rounded-r-lg ${ beginningEnd === 'end' ? 'bg-orange-500' : 'hover:bg-gray-700' } cursor-pointer` }>End</div>
                        </div>
                    </div>
                    <div className='text-gray-200 mb-3 text-xs'>
                        <p className='text-sm'>Annual deposit % increse? <span className='text-gray-400'>(optional)</span></p>
                        <div className='flex mt-1'>
                            <div className='relative'>
                                <input
                                    value={ annualDepositIncrease }
                                    onChange={ ( e ) => setAnnualDepositIncrease( e.target.value ) }
                                    className='w-20 h-9 px-2 pr-6 border-1 border-gray-400 rounded-lg hover:bg-gray-700 cursor-pointer bg-transparent text-white outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                    type="number"
                                />
                                <span className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none'>
                                    %
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* calcultor thirth section */ }
            <div className='h-[70px] w-[350px] flex justify-between items-center bg-gray-900 border-[0.5px] border-gray-400 rounded-b-xl border-t-0'>
                <div className='text-white ml-4 flex items-center gap-2'>
                    {total && (
                        <>
                            {getCurrencySign()}
                            <span>{total}</span>
                        </>
                    )}
                </div>
                <div>
                    <button
                        onClick={ () => calculateTotal() }
                        className='border-[1px] transition-all duration-700 ease-in-out border-gray-400 mr-4 flex gap-2 rounded-lg px-3 py-1 text-gray-300 bg-green-700 hover:bg-green-900'>
                        <div className='text-[22px]'>
                            <MdOutlineCalculate />
                        </div>
                        Calculate
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Calculator