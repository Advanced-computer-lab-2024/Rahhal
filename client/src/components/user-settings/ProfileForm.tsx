export default function ProfileForm() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border h-[1px] w-full"
      ></div>
      <form className="space-y-8">
        <div className="space-y-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor=":Ruflpukv9u6ja:-form-item"
          >
            Username
          </label>
          <input
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="shadcn"
            id=":Ruflpukv9u6ja:-form-item"
            aria-describedby=":Ruflpukv9u6ja:-form-item-description"
            aria-invalid="false"
            name="username"
          />
          <p
            id=":Ruflpukv9u6ja:-form-item-description"
            className="text-[0.8rem] text-muted-foreground"
          >
            This is your public display name. It can be your real name or a pseudonym. You can only
            change this once every 30 days.
          </p>
        </div>
        <div className="space-y-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor=":R1eflpukv9u6ja:-form-item"
          >
            Email
          </label>
          <button
            type="button"
            role="combobox"
            aria-controls="radix-:Rleflpukv9u6ja:"
            aria-expanded="false"
            aria-autocomplete="none"
            dir="ltr"
            data-state="closed"
            data-placeholder=""
            className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&amp;>span]:line-clamp-1"
            id=":R1eflpukv9u6ja:-form-item"
            aria-describedby=":R1eflpukv9u6ja:-form-item-description"
            aria-invalid="false"
          >
            <span style={{ pointerEvents: "none" }}>Select a verified email to display</span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 opacity-50"
              aria-hidden="true"
            >
              <path
                d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <select
            aria-hidden="true"
            tabIndex={-1}
            style={{
              position: "absolute",
              border: "0px",
              width: "1px",
              height: "1px",
              padding: "0px",
              margin: "-1px",
              overflow: "hidden",
              clip: "rect(0px, 0px, 0px, 0px)",
              whiteSpace: "nowrap",
              overflowWrap: "normal",
            }}
          >
            <option value=""></option>
            <option value="m@example.com">m@example.com</option>
            <option value="m@google.com">m@google.com</option>
            <option value="m@support.com">m@support.com</option>
          </select>
          <p
            id=":R1eflpukv9u6ja:-form-item-description"
            className="text-[0.8rem] text-muted-foreground"
          >
            You can manage verified email addresses in your{" "}
            <a href="/examples/forms">email settings</a>.
          </p>
        </div>
        <div className="space-y-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor=":R1uflpukv9u6ja:-form-item"
          >
            Bio
          </label>
          <textarea
            className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            placeholder="Tell us a little bit about yourself"
            name="bio"
            id=":R1uflpukv9u6ja:-form-item"
            aria-describedby=":R1uflpukv9u6ja:-form-item-description"
            aria-invalid="false"
          >
            I own a computer.
          </textarea>
          <p
            id=":R1uflpukv9u6ja:-form-item-description"
            className="text-[0.8rem] text-muted-foreground"
          >
            You can <span>@mention</span> other users and organizations to link to them.
          </p>
        </div>
        <div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor=":Rmeflpukv9u6ja:-form-item"
            >
              URLs
            </label>
            <p
              id=":Rmeflpukv9u6ja:-form-item-description"
              className="text-[0.8rem] text-muted-foreground"
            >
              Add links to your website, blog, or social media profiles.
            </p>
            <input
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              id=":Rmeflpukv9u6ja:-form-item"
              aria-describedby=":Rmeflpukv9u6ja:-form-item-description"
              aria-invalid="false"
              name="urls.0.value"
              value="https://shadcn.com"
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
              htmlFor=":R16eflpukv9u6ja:-form-item"
            >
              URLs
            </label>
            <p
              id=":R16eflpukv9u6ja:-form-item-description"
              className="text-[0.8rem] text-muted-foreground sr-only"
            >
              Add links to your website, blog, or social media profiles.
            </p>
            <input
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              id=":R16eflpukv9u6ja:-form-item"
              aria-describedby=":R16eflpukv9u6ja:-form-item-description"
              aria-invalid="false"
              name="urls.1.value"
              value="http://twitter.com/shadcn"
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs mt-2"
          >
            Add URL
          </button>
        </div>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          type="submit"
        >
          Update profile
        </button>
      </form>
    </div>
  );
}
