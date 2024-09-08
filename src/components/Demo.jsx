import { Component } from 'react'

export default class Demo extends Component {
    render() {
        return (
             <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Table: 225
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={this.props.hidden}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="bg-white border-b">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                STT
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Name
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Amount
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Price
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-gray-100 border-b">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                Salad
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                2
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                75000
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                Burgur
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                3
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                75000
                                            </td>
                                        </tr>
                                        <tr className="bg-gray-100 border-b">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                drink
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                2
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                15000
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">4</td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                s
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                2
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                25000
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={this.props.hidden}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={this.props.hidden}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>

        )
    }
}
