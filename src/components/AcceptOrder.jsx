import { Component } from 'react'

export default class PopUpAccept extends Component {
  constructor(props) {
    super(props);
    this.state = { isModalOpen: false };
  }

  toggleModal = () => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  }
  render() {
    return (
      <div>
        <button onClick={this.toggleModal} className="mr-2 flex items-center justify-center border-2 border-green-400 text-green-600 bg-none hover:bg-green-300 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
          Accept
        </button>

        {this.state.isModalOpen && (
          <div id="popup-modal" tabIndex={-1} className="overflow-y-auto overflow-x-hidden flex justify-center items-center w-full md:inset-0 fixed inset-0 z-50">
            <div className="absolute top-0 left-0 h-screen w-screen bg-black bg-opacity-50"></div>
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow">
                <button
                  type="button"
                  className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  data-modal-hide="popup-modal"
                  onClick={this.toggleModal}
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-4 md:p-5 text-center">
                  <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500">Are you sure you want to accept this order?</h3>
                  <button onClick={this.toggleModal} type="button" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                    Yes, I am sure
                  </button>
                  <button onClick={this.toggleModal} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-500 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">No, cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

