import { Component } from "react";
import { variables } from "./Variable";

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionId: 0,
      sum: 0,
      category_data: { name: "" },
      date: "",
      description: "",
      transactions: [],
    };
  }

  componentDidMount() {
    this.reshreshList();
  }

  reshreshList = () => {
    fetch(variables.API_URL + this.props.trans)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ transactions: data });
      });
  };

  addClick() {
    this.setState({
      transactionId: 0,
      sum: 0,
      category_data: { name: "Jedzenie" },
      date: "",
      description: "",
    });
  }

  changeSum = (e) => {
    this.setState({ sum: e.target.value });
  };
  changeCategory = (e) => {
    const category_data = { name: e.target.value };
    this.setState({ category_data: category_data });
  };
  changeDate = (e) => {
    this.setState({ date: e.target.value });
  };
  changeDescription = (e) => {
    this.setState({ description: e.target.value });
  };

  createClick = () => {
    const url = variables.API_URL + this.props.trans;
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transactionSum: this.state.sum,
        category_data: this.state.category_data,
        transactionDate: this.state.date,
        transactionDescription: this.state.description,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        this.reshreshList();
        this.props.onDataChanged();
      })
      .catch((error) => {
        alert("Failed");
        console.log(error);
      });
  };
  editClick = (transaction) => {
    this.setState({
      transactionId: transaction.transactionId,
      sum: transaction.transactionSum,
      category_data: transaction.category,
      date: transaction.transactionDate,
      description: transaction.transactionDescription,
    });
  };
  updateClick() {
    const url = variables.API_URL + this.props.trans;
    fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transactionId: this.state.transactionId,
        transactionSum: this.state.sum,
        category_data: this.state.category_data,
        transactionDate: this.state.date,
        transactionDescription: this.state.description,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        this.reshreshList();
        this.props.onDataChanged();
      })
      .catch((error) => {
        alert("Failed");
        console.log(error);
      });
  }

  deleteClick = (id) => {
    if (window.confirm("Czy na pewno usunąć?")) {
      const url = variables.API_URL + this.props.trans + "/" + id;
      fetch(url, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          alert(result);
          this.reshreshList();
          this.props.onDataChanged();
        })
        .catch((error) => {
          alert("Failed");
          console.log(error);
        });
    }
  };

  render() {
    let bs_target = "#" + this.props.name;
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target={bs_target}
          onClick={() => this.addClick()}
        >
          Wprowadź {this.props.name}
        </button>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nr.</th>
              <th>Kwota[zł]</th>
              <th>Kategoria</th>
              <th>Data</th>
              <th>Opis</th>
            </tr>
          </thead>
          <tbody>
            {this.state.transactions.map((transaction, i) => (
              <tr key={transaction.transactionId}>
                <td>{i + 1}</td>
                <td>{transaction.transactionSum}</td>
                <td>{transaction.category.name}</td>
                <td>{transaction.transactionDate}</td>
                <td>{transaction.transactionDescription}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target={bs_target}
                    onClick={() => this.editClick(transaction)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.deleteClick(transaction.transactionId)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path
                        fillRule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="modal fade"
          aria-hidden="true"
          id={this.props.name}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Wprowadź {this.props.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Zamknij"
                ></button>
              </div>

              <div className="modal-body">
                <div className="d-flex flex-row bd-hightlight">
                  <div className="p-2 w-50 bd-highlight">
                    <div className="input-group mb-3">
                      <span className="input-group-text">Kwota[zł]</span>
                      <input
                        type="number"
                        className="form-control"
                        value={this.state.sum}
                        onChange={this.changeSum}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Kategoria</span>
                      <select
                        className="form-select"
                        value={this.state.category_data.name}
                        onChange={this.changeCategory}
                      >
                        <option value="Jedzenie">Jedzenie</option>
                        <option value="Transport">Transport</option>
                        <option value="Rozrywka">Rozrywka</option>
                        <option value="Zdrowie">Zdrowie</option>
                      </select>
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Data</span>
                      <input
                        type="date"
                        className="form-control"
                        value={this.state.date}
                        onChange={this.changeDate}
                      />
                    </div>
                  </div>
                  <div className="p-2 w-50 bd-highlight">
                    <div className="input-group mb-3">
                      <span className="input-group-text">Opis</span>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={this.state.description}
                        onChange={this.changeDescription}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              {this.state.transactionId === 0 ? (
                <button
                  type="button"
                  className="btn btn-primary float-start"
                  onClick={() => this.createClick()}
                >
                  Zapisz
                </button>
              ) : null}

              {this.state.transactionId !== 0 ? (
                <button
                  type="button"
                  className="btn btn-primary float-start"
                  onClick={() => this.updateClick()}
                >
                  Zmień
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Transaction;
